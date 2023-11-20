'use client';

import { COLORS } from '@/lib/constants';
import { Color } from '@/lib/types';
import { cn, getTopNClosestColors } from '@/lib/utils';
import { useColorActions, useColors, useFavoriteColors } from '@/store/color';
import {
  Building,
  Check,
  Copy,
  Fullscreen,
  Heart,
  Paintbrush,
  PersonStanding,
} from 'lucide-react';
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
  const colors = useColors();
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
    colorActions.toggleFavoriteColors(color.id);
  };

  const handleMouseEnterPreview = () => {
    if (color.code === COLORS.CREATION) {
      setColorText(color.name);
    } else {
      setColorText(color.code);
    }
  };

  const handleMouseLeavePreview = () => {
    setColorText(color.name);
  };

  return (
    <div className="relative group/palette-card flex flex-col justify-center items-center space-y-2">
      <Button
        disabled
        variant="ghost"
        size="icon"
        className="absolute top-0 left-0 rounded-full"
      >
        {color.code === COLORS.CREATION ? (
          <PersonStanding className="shrink-0 h-4 w-4" />
        ) : (
          <Building className="shrink-0 h-4 w-4" />
        )}
      </Button>
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
        onMouseEnter={handleMouseEnterPreview}
        onMouseLeave={handleMouseLeavePreview}
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
            className="h-full w-full max-h-none max-w-none sm:rounded-none"
            style={{ backgroundColor: color.hexCode }}
          >
            <DialogHeader>
              <DialogTitle>{color.name}</DialogTitle>
              <DialogDescription>
                {color.code} - {color.hexCode}
              </DialogDescription>
            </DialogHeader>
            <section className="flex flex-col space-y-2">
              {getTopNClosestColors(color, colors, 10).map((color) => (
                <div
                  key={color.id}
                  className="flex-1 flex justify-between items-center py-2 px-4 shadow-md"
                  style={{ backgroundColor: color.hexCode }}
                >
                  <p>{color.name}</p>
                  <p>
                    {color.code} - {color.hexCode}
                  </p>
                </div>
              ))}
            </section>
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
