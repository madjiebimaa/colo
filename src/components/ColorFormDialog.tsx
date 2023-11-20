'use client';

import { useColorActions } from '@/store/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Color name must containt at least 3 character(s)' })
    .max(30, { message: 'Color name contain at most 5 character(s)' }),
  hexCode: z
    .string()
    .min(3, { message: 'Hex code must containt at least 3 character(s)' })
    .max(6, { message: 'Hex code contain at most 6 character(s)' }),
});

export function ColorFormDialog() {
  const colorActions = useColorActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hexCode: '',
    },
  });

  const resetForm = () => {
    form.setValue('name', '');
    form.setValue('hexCode', '');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    colorActions.addColor(values.name, values.hexCode);
    resetForm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full">
          Create your own color
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Color Creation</DialogTitle>
          <DialogDescription>
            Create palettes with custom title colors using hex codes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Black"
                      autoComplete="off"
                      className="col-span-4 rounded-full"
                    />
                  </FormControl>
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="hexCode" className="text-right">
                    Hex Code
                  </Label>
                  <div className="flex col-span-3">
                    <Input
                      disabled
                      defaultValue="#"
                      className="w-10 rounded-l-full"
                    />
                    <FormControl>
                      <Input
                        {...field}
                        id="hexCode"
                        type="text"
                        placeholder="000000"
                        autoComplete="off"
                        className="rounded-r-full"
                      />
                    </FormControl>
                  </div>
                  <div
                    style={{
                      backgroundColor: `#${
                        form.getValues('hexCode') || '000000'
                      }`,
                    }}
                    className="col-span-1 ml-auto h-10 w-10 rounded-full border border-black"
                  />
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="submit"
              className="rounded-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
