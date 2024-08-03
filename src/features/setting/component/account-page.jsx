import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ACCOUNT } from '../test/data/strings';

const formShcema = z
  .object({
    old_password: z.string().trim().min(6),
    new_password: z
      .string({
        required_error: ACCOUNT.NEW_PASSWORD_REQUIRED,
      })
      .trim()
      .min(6),
    re_confirm_password: z
      .string({
        required_error: ACCOUNT.CONFIRM_PASSWORD_REQUIRED,
      })
      .trim()
      .min(6),
  })
  .refine(data => data.new_password === data.re_confirm_password, {
    message: 'New password and confirm password must be match',
    path: ['re_confirm_password'],
  });

function Account() {
  const form = useForm({
    resolver: zodResolver(formShcema),
    defaultValues: {
      old_password: '',
      new_password: '',
      re_confirm_password: '',
    },
  });

  const onSubmit = () => {
    console.log('Submitted');
  };

  const onError = error => {
    console.log(error);
  };

  return (
    <OverlayScrollbarsComponent>
      <div className="container-ns flex flex-col w-[74.5vw] overflow-auto">
        <div className="z-30 mx-3 text-2xl font-bold pt-8 pb-[14px]  border-b-[1px] border-slate-300 group sticky bg-background">
          {'Account'}
        </div>

        <div className="flex flex-col">
          <div className="m-3 border-b-[1px] p-2">
            <p className="font-semibold">{'Change Password'}</p>
          </div>

          <div className="mx-3 p-2 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit({ onSubmit, onError })}>
                {/* To support accesibility */}
                <input hidden type="text" autoComplete="username" />

                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex flex-row items-center justify-between w-[40vw] mt-2">
                        <FormLabel className="font-semibold text-base">
                          {'Old password'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="current-password"
                            placeholder="Old password"
                            {...field}
                            type="password"
                            className="w-[350px]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex flex-row items-center justify-between w-[40vw] mt-2">
                        <FormLabel className="font-semibold text-base">
                          {'New password'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            placeholder="New password"
                            {...field}
                            type="password"
                            className="w-[350px]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="re_confirm_password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex flex-row items-center justify-between w-[40vw] mt-2">
                        <FormLabel className="font-semibold text-base">
                          {'Confirm new password'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            placeholder="Confirm new password"
                            {...field}
                            type="password"
                            className="w-[350px]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mt-6">{'Update'}</Button>
              </form>
            </Form>
          </div>

          <div className="m-3 mt-12 border-b-[1px] p-2">
            <p className="font-bold text-rose-500">{'Delete Account'}</p>
          </div>

          <div className="mx-3 p-2 space-y-4">
            <p>{ACCOUNT.DELETE_DESCRIPTION}</p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-white text-red-400 hover:bg-rose-500 hover:text-white border border-rose-500">
                  {'Delete your account'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {'Are you absolutely sure?'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {ACCOUNT.ALERT}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{'Cancel'}</AlertDialogCancel>
                  <AlertDialogAction>{'Continue'}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </OverlayScrollbarsComponent>
  );
}

export default Account;
