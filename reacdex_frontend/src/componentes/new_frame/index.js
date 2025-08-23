import React from "react";

function zeroPad(n, size = 3) {
  return String(n).padStart(size, "0");
}

function makeDefaultItems() {
  // Usa as artes oficiais do repositório público da PokéAPI
  return Array.from({ length: 151 }, (_, i) => {
    const numero = i + 1;
    return {
      numero,
      nome: `pokemon ${zeroPad(numero)}`,
      tipo: [],
      evolui: undefined,
      imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png`,
    };
  });
}

function Badge({ children }) {
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-xs border">
      {children}
    </span>
  );
}

function Card({ item }) {
  const { numero, nome, tipo = [], evolui, imagem } = item;
  return (
    <div className="rounded-2xl shadow-md border p-3 flex flex-col items-center gap-2 bg-white">
      <div className="w-[200px] h-[250px] overflow-hidden rounded-xl flex items-center justify-center bg-gray-50">
        {/* A imagem mantém 200x250 via container; object-contain evita cortes */}
        <img
          src={imagem}
          alt={nome || `pokemon ${zeroPad(numero)}`}
          className="w-full h-full object-contain"
          width={200}
          height={250}
          loading="lazy"
        />
      </div>

      <div className="w-full text-center">
        <p className="text-sm text-gray-500">#{zeroPad(numero)}</p>
        <h3 className="text-base font-semibold capitalize">{nome}</h3>
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {tipo && tipo.length > 0 ? (
          tipo.map((t, idx) => <Badge key={idx}>{t}</Badge>)
        ) : (
          <span className="text-xs text-gray-400">tipo não informado</span>
        )}
      </div>

      <div>
        {typeof evolui === "boolean" ? (
          <Badge>{evolui ? "evolui" : "não evolui"}</Badge>
        ) : (
          <span className="text-xs text-gray-400">evolução não informada</span>
        )}
      </div>
    </div>
  );
}

export default function PokedexGrid({ items }) {
  const data = Array.isArray(items) && items.length > 0 ? items : makeDefaultItems();

  return (
    <div className="w-4/5 mx-auto py-6">
      <div className="grid grid-cols-6 gap-4">
        {data.slice(0, 151).map((item) => (
          <Card key={item.numero} item={item} />
        ))}
      </div>
    </div>
  );
}