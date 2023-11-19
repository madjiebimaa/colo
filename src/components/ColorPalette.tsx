'use client';

import { Color } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useColorActions, useFavoriteColors } from '@/store/color';
import { Check, Copy, Fullscreen, Heart, Paintbrush } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface ColorPaletteProps {
  color: Color;
}

export default function ColorPalette({ color }: ColorPaletteProps) {
  const [colorText, setColorText] = useState(color.name);
  const [isCopied, setIsCopied] = useState(false);
  const favoriteColors = useFavoriteColors();
  const colorActions = useColorActions();

  const isFavoritedColor = Boolean(
    favoriteColors.find((id) => id === color.id)
  );

  const handleClickCopy = async () => {
    await navigator.clipboard.writeText(color.hexCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleClickPaintbrush = () => {
    colorActions.selectColor(color);
  };

  const handleClickHeart = () => {
    colorActions.addToFavoriteColors(color.id);
  };

  return (
    <div className="relative group/palette-card flex flex-col justify-center items-center space-y-2">
      <Button
        variant="ghost"
        size="icon"
        className="invisible group-hover/palette-card:visible absolute top-0 right-0 rounded-full hover:brightness-90"
        onClick={handleClickHeart}
      >
        <Heart
          className={cn(
            'shrink-0 h-4 w-4',
            isFavoritedColor ? 'text-red-600 fill-red-600' : ''
          )}
        />
      </Button>
      <div
        className="h-20 w-20 rounded-full shadow-md"
        style={{ backgroundColor: color.hexCode }}
        onMouseEnter={() => setColorText(color.code)}
        onMouseLeave={() => setColorText(color.name)}
      />
      <p>{colorText}</p>
      <div className="invisible group-hover/palette-card:visible flex items-center rounded-full bg-secondary text-secondary-foreground p-1 space-x-1">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full hover:brightness-90"
          onClick={handleClickCopy}
        >
          {isCopied ? (
            <Check className="shrink-0 h-4 w-4" />
          ) : (
            <Copy className="shrink-0 h-4 w-4" />
          )}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full hover:brightness-90"
            >
              <Fullscreen className="shrink-0 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="h-screen w-screen max-h-none max-w-none sm:rounded-none"
            style={{ backgroundColor: color.hexCode }}
          >
            <DialogHeader>
              <DialogTitle>{color.name}</DialogTitle>
              <DialogDescription>
                {color.code} - {color.hexCode}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full hover:brightness-90"
          onClick={handleClickPaintbrush}
        >
          <Paintbrush className="shrink-0 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
