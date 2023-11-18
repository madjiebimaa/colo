'use client';

import colors from '../data/vinilex-colors.json';
import ColorPalette from './ColorPalette';
import Footer from './Footer';

export default function ColorPaletteList() {
  return (
    <div className="flex-1 flex flex-col">
      <section className="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 py-6 px-4">
        {colors.map((color) => (
          <ColorPalette key={color.id} color={color} />
        ))}
      </section>
      <Footer />
    </div>
  );
}
