---
title: "Murmur"
description: "Una grabadora de reuniones local para macOS. Transcribe las llamadas en el propio equipo con Whisper, reconoce a quién habla por su voz y escribe notas, decisiones y tareas en Markdown, con un LLM local o tu propia clave de API."
image: "/images/projects/murmur/front.png"
tags: ["Rust", "Tauri", "Whisper", "macOS"]
order: 3
url: "/es/projects/murmur"
repo: "https://github.com/DanielPenalozaB/murmur"
---

## Resumen

Murmur graba y transcribe reuniones de Teams, Google Meet, Slack y Zoom, todo dentro de tu Mac. La transcripción corre en el equipo con Whisper. Los resúmenes y las preguntas en vivo usan por defecto un modelo Qwen local a través de Ollama, o tu propia clave de Claude o Gemini si eliges eso para una sesión. El audio nunca sale del equipo.

La idea es tener notas de las reuniones sin subir las llamadas al servidor de nadie. Es una aplicación publicada: salieron cuatro versiones entre el 28 de octubre y el 2 de noviembre de 2026, a lo largo de 38 pull requests integrados, y se actualiza sola.

## Qué hace

- Muestra una transcripción en vivo de tu micrófono y de la llamada, incluso en reuniones que cambian de idioma, y responde preguntas sobre la reunión mientras ocurre.
- Escribe las notas cuando termina la reunión: un resumen, las decisiones, las tareas y las preguntas abiertas, cada una enlazada al momento en que se dijo, junto con la grabación para volver a escuchar cualquier momento. Cada sesión es un archivo Markdown en la carpeta que elijas, listo para Obsidian o cualquier editor.
- Muestra una tarjeta y una notificación cuando alguien menciona tu nombre o te pregunta algo. ⌃⌥M marca un momento y ⌃⌥N agrega una nota rápida sin salir de la llamada.
- Reúne las tareas de todas las reuniones en una sola lista, con las tuyas primero y las vencidas marcadas. Al tachar una, también se tacha en las notas de esa reunión.
- Reconoce a quién habla por su voz. Nombras a alguien una vez y Murmur sugiere su nombre en las reuniones siguientes, y avisa cuando un nombre no coincide con una voz.
- Detecta cuando Teams, Slack, Zoom o una llamada en el navegador empieza a usar el micrófono y ofrece grabar. No graba nada hasta que lo aceptas.
- Busca en todas las reuniones, organizadas en cuadernos.

## Cómo funciona

```
┌────────────── macOS ──────────────┐
│ Mic ── audiocap --source mic ─────┤ Swift helper, one
│ System ─ audiocap --source system ┤ process per channel:
│   (Core Audio process tap)        │ 16 kHz mono f32 on stdout
└─────────────────────────┼─────────┘
                          ▼
        murmur-audio: 100 ms frames per channel → WAV tracks + earshot VAD
                          │  SpeechChunk { channel, start_ms, samples }
                          ▼
        murmur-stt: whisper.cpp (whisper-rs, Metal) worker thread
                          │  Segment { start, end, channel, text }
                          ▼
        session actor (src-tauri, tokio) ── append ──► transcript (in memory + SQLite)
            │                    │                              │
            │ tauri::ipc::Channel│ Ask question                 │ Stop
            ▼                    ▼                              ▼
        React UI          murmur-llm: transcript prefix   diarize (sherpa-onnx) → summary
        (live lines)      + question → stream answer      → murmur-store writes .md/.txt
```

Un pequeño programa en Swift captura el micrófono y, mediante los process taps de Core Audio, el audio de la llamada. Rust hace todo lo demás. La identidad de quien habla funciona en dos capas: durante la llamada la define el canal (tu micrófono se etiqueta «Me» y el audio del sistema «Them»), y al terminar, los embeddings de voz separan el otro lado en voces individuales que puedes nombrar.

| Tema                   | Elección                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| Aplicación             | Tauri 2                                                                 |
| Interfaz               | React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Zustand    |
| Captura de audio       | Programa en Swift con AVAudioEngine y process taps de Core Audio (macOS 14.4+) |
| Detección de voz       | `earshot`, en Rust puro                                                 |
| Transcripción          | `whisper-rs` (whisper.cpp sobre Metal), large-v3-turbo                  |
| Separación de hablantes | `sherpa-onnx` con segmentación de pyannote y embeddings de NeMo TitaNet |
| LLMs                   | Ollama, Anthropic y Gemini, con respuestas en streaming por SSE con `reqwest` |
| Almacenamiento         | Archivos Markdown y un índice SQLite con búsqueda de texto completo (FTS5) |
| Secretos               | El llavero de macOS; las claves de API nunca llegan a la interfaz web   |

El código en Rust está dividido en crates (`murmur-core`, `murmur-audio`, `murmur-stt`, `murmur-llm`, `murmur-store`) que solo dependen de los tipos del núcleo. Solo la capa de Tauri conoce Tauri, así las partes difíciles (el audio, el reconocimiento de voz y los prompts) se pueden probar con `cargo test`.

## Problemas que tuve que resolver

### ¿Demasiados hablantes?

Una reunión temprana de 21 minutos salió con más de 49 hablantes, y parecía que la separación estaba dividiendo a las personas. Antes de ajustar nada, comparé reuniones recientes con su número real de asistentes. La separación actual en realidad encuentra menos hablantes que asistentes (15 frente a unos 19 en un standup), cada par de hablantes distintos tiene menos de 0,62 de similitud y una división real de una misma persona da entre 0,83 y 0,92. Las reuniones con números enormes se habían transcrito con una versión anterior, así que la solución fue volver a transcribirlas, no cambiar los umbrales.

### Revisar los nombres contra las voces

Cuando la aplicación recuerda a las personas por su voz, un nombre equivocado puede propagarse. La pantalla de hablantes ahora revisa los nombres: si dos hablantes con el mismo nombre se parecen menos de un 50%, probablemente son dos personas, y si dos voces guardadas se parecen un 60% o más pero nunca coincidieron en una reunión, puede que sean una sola. Al corregir un nombre, la voz guardada se reconstruye con los hablantes que quedan bajo ese nombre.

### Un micrófono en silencio en Teams

Cuatro grabaciones salieron con la pista del micrófono llena de ceros durante toda la llamada, mientras el audio de la llamada estaba bien. El micrófono era un audífono Bluetooth, y el mismo programa lo grababa sin problema fuera de una llamada; la causa probable es que silenciarse en Teams se transmite al audífono. Murmur nunca se silencia por su cuenta, así que hice que registre los tramos de silencio digital junto con el dispositivo, para detectarlo fácil la próxima vez.

### Registros que no llegaban a ningún lado

Depurando, descubrí que el tracing de la aplicación no tenía ningún suscriptor, así que todas las advertencias se perdían. Ahora las advertencias, los errores y los panics van a un archivo en `~/Library/Logs` que rota cada 1 MB.

## Versiones

Murmur se distribuye como un `.dmg` para Macs con Apple silicon y macOS 14.4 o posterior. En el primer uso descarga sus modelos de voz (unos 770 MB) y pide acceso al micrófono y al audio del sistema. Las versiones se construyen con un workflow de GitHub Actions a partir de una etiqueta de versión, y desde la versión 0.3.0 la aplicación se actualiza sola con actualizaciones firmadas. Todavía no está notarizada por Apple.

El código es de fuente disponible bajo la licencia PolyForm Shield.
