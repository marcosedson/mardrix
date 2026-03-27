export type CrudId = string;

export type CrudEntityBase = {
  id: CrudId;
  created_at: string;
  updated_at: string;
};

const g = globalThis as unknown as {
  __mardrixCrudStore?: Map<string, CrudEntityBase[]>;
};

function getStore() {
  if (!g.__mardrixCrudStore) g.__mardrixCrudStore = new Map();
  return g.__mardrixCrudStore;
}

export function listEntities<T extends CrudEntityBase>(resource: string): T[] {
  const store = getStore();
  return (store.get(resource) ?? []) as T[];
}

export function seedEntities<T extends CrudEntityBase>(resource: string, items: T[]) {
  const store = getStore();
  if (!store.has(resource)) store.set(resource, items as CrudEntityBase[]);
}

export function createEntity<T extends CrudEntityBase>(resource: string, item: Omit<T, keyof CrudEntityBase>): T {
  const store = getStore();
  const now = new Date().toISOString();
  const entity = {
    ...(item as object),
    id: crypto.randomUUID?.() ?? `mock-${Date.now()}`,
    created_at: now,
    updated_at: now,
  } as T;

  const curr = (store.get(resource) ?? []) as T[];
  store.set(resource, [entity, ...curr] as unknown as CrudEntityBase[]);
  return entity;
}

export function updateEntity<T extends CrudEntityBase>(resource: string, id: string, patch: Partial<Omit<T, keyof CrudEntityBase>>): T | null {
  const store = getStore();
  const curr = (store.get(resource) ?? []) as T[];
  const idx = curr.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  const now = new Date().toISOString();
  const next = { ...curr[idx], ...(patch as object), updated_at: now } as T;
  const out = [...curr];
  out[idx] = next;
  store.set(resource, out as unknown as CrudEntityBase[]);
  return next;
}

export function deleteEntity<T extends CrudEntityBase>(resource: string, id: string): boolean {
  const store = getStore();
  const curr = (store.get(resource) ?? []) as T[];
  const next = curr.filter((x) => x.id !== id);
  if (next.length === curr.length) return false;
  store.set(resource, next as unknown as CrudEntityBase[]);
  return true;
}

