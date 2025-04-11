import { SVGAttributes } from 'react';

export default function FlutterIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 128 128" {...props}>
      <g fill="#3FB6D3">
        <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z">
        </path>
      </g>
      <path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z"></path>
      <path fill="#19599A" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z"></path>
      <linearGradient id="flutter-original-a" gradientUnits="userSpaceOnUse" x1="59.365" y1="116.36" x2="86.825" y2="99.399">
        <stop offset="0" stopColor="#1b4e94">
        </stop>
        <stop offset=".63" stopColor="#1a5497">
        </stop>
        <stop offset="1" stopColor="#195a9b">
        </stop>
      </linearGradient>
      <path fill="url(#flutter-original-a)" d="M61.6 113.1l30.8-8.4-10.8-10.8z">
      </path>
    </svg>
  );
}
