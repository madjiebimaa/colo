'use client';

import { Github } from 'lucide-react';
import { Button } from './ui/button';

export default function Aside() {
  return (
    <aside className="md:sticky md:top-0 flex flex-col md:h-screen md:max-w-[300px] pt-6 px-6 pb-12">
      <header className="space-y-4">
        <p>
          <strong>Colo</strong> is your one-stop destination for all things
          paint, providing a curated selection of wall colors from renowned
          manufacturers.
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full hover:brightness-90"
          >
            <a href="https://github.com/madjiebimaa/colo" target="_blank">
              <Github className="shrink-0 h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-10 rounded-full hover:brightness-90"
          >
            <a href="https://github.com/madjiebimaa" target="_blank">
              Become a sponsor
            </a>
          </Button>
        </div>
      </header>
    </aside>
  );
}
