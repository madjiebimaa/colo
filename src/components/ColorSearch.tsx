'use client';

import { debounce } from '@/lib/utils';
import { useColorActions } from '@/store/color';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  query: z
    .string()
    .max(30, { message: 'Color name contain at most 5 character(s)' }),
});

export default function ColorSearch() {
  const colorActions = useColorActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    colorActions.searchColors(values.query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    form.setValue('query', event.target.value);
    debounce(form.handleSubmit(onSubmit), 1000)();
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
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
      </form>
    </Form>
  );
}
