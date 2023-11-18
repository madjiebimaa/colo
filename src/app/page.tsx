'use client';

import Aside from '@/components/Aside';
import ColorPaletteList from '@/components/ColorPaletteList';
import { useCurrentColor } from '@/store/color';

export default function Home() {
  const currentColor = useCurrentColor();

  return (
    <main
      className="flex flex-col md:flex-row"
      style={{
        backgroundColor: currentColor ? currentColor.hexCode : 'white',
      }}
    >
      <Aside />
      <ColorPaletteList />
    </main>
  );
}
