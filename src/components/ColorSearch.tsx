'use client';

import { ColorFilterOption } from '@/lib/types';
import { debounce } from '@/lib/utils';
import { useColorActions } from '@/store/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Toggle } from './ui/toggle';

const formSchema = z.object({
  query: z
    .string()
    .max(30, { message: 'Color name contain at most 5 character(s)' }),
  filters: z.string().array(),
});

export default function ColorSearch() {
  const colorActions = useColorActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
      filters: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    colorActions.searchColors(
      values.query,
      values.filters as ColorFilterOption[]
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    form.setValue('query', event.target.value);
    debounce(form.handleSubmit(onSubmit), 1000)();
  };

  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filterOption = event.currentTarget.dataset.filter!;
    const colorFilterOption = filterOption as ColorFilterOption;

    const colorFilters = form.getValues('filters');
    if (colorFilters.includes(colorFilterOption)) {
      form.setValue(
        'filters',
        colorFilters.filter((colorFilter) => colorFilter !== filterOption)
      );
    } else {
      form.setValue('filters', [...colorFilters, colorFilterOption]);
    }

    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Find you true color"
                  autoComplete="off"
                  className="text-xl rounded-full"
                  onChange={handleChange}
                  onKeyDown={(event) =>
                    event.key === 'Enter' && event.preventDefault()
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          <Toggle
            data-filter="heart"
            aria-label="Toggle heart"
            size="lg"
            onClick={handleClickFilter}
          >
            <Heart />
          </Toggle>
        </div>
      </form>
    </Form>
  );
}
