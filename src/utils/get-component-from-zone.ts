import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';

export function getComponentFromZone<T = DynamicZone>(
  zone: DynamicZone[],
  componentName: string
): T | undefined {
  return zone.find((section) => section.__component === componentName) as T | undefined;
}
