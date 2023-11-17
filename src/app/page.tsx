'use client';

import ColorPaletteList from '@/components/ColorPaletteList';
import { useCurrentColor } from '@/store/color';

export default function Home() {
  const currentColor = useCurrentColor();

  return (
    <main
      className="flex flex-col"
      style={{
        backgroundColor: currentColor ? currentColor.hexCode : 'whitesmoke',
      }}
    >
      <ColorPaletteList />
    </main>
  );
}
