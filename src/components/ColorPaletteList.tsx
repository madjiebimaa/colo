'use client'

import colors from '../data/vinilex-colors.json';
import ColorPalette from './ColorPalette';

export default function ColorPaletteList() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 py-6 px-4">
      {colors.map((color) => (
        <ColorPalette key={color.id} color={color} />
      ))}
    </section>
  );
}
