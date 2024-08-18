export const movements = [
  { id: 1, tipo: "Traslado", descripcion: "Paracetamol a Depósito Secundario", desde: "Depósito Central", hacia: "Depósito Secundario", fecha: "2024-08-15" },
  { id: 2, tipo: "Recepción", descripcion: "Ibuprofeno desde Depósito Secundario", desde: "Depósito Secundario", hacia: "Depósito Central", fecha: "2024-08-14" },
  { id: 3, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 4, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 5, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 7, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 8, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 8, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 10, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  { id: 6, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
];

export const movementDetails = {
  1: {
    tipo: "Traslado",
    descripcion: "Paracetamol a Depósito Secundario",
    desde: "Depósito Central",
    hacia: "Depósito Secundario",
    fecha: "2024-08-15",
    realizadoPor: "Juan Pérez",
    productos: [
      { id: 1, nombre: "Paracetamol", lote: "A123", cantidad: 50 },
      { id: 2, nombre: "Paracetamol", lote: "A124", cantidad: 25 },
      { id: 3, nombre: "Paracetamol", lote: "A124", cantidad: 25 },
      { id: 5, nombre: "Paracetamol", lote: "A124", cantidad: 25 },
    ],
  },
  2: {
    tipo: "Recepción",
    descripcion: "Ibuprofeno desde Depósito Secundario",
    desde: "Depósito Secundario",
    hacia: "Depósito Central",
    fecha: "2024-08-14",
    realizadoPor: "María López",
    productos: [
      { id: 1, nombre: "Ibuprofeno", lote: "B456", cantidad: 30 },
    ],
  },
  3: {
    tipo: "Despacho",
    descripcion: "Amoxicilina a Depósito Norte",
    desde: "Depósito Central",
    hacia: "Depósito Norte",
    fecha: "2024-08-13",
    realizadoPor: "Carlos García",
    productos: [
      { id: 1, nombre: "Amoxicilina", lote: "C789", cantidad: 100 },
    ],
  },
};