import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import withScrollbarTheme from '../hoc/scroll-bar';
import { NOTIFICATION } from '../test/data/strings';

const formSchema = z.object({
  email: z.string().email(),
  community_emails: z.boolean().optional(),
  security_emails: z.boolean().optional(),
  social_emails: z.boolean().optional(),
  notify_me: z.boolean().optional(),
});

function Notification() {
  const [communicationEmail, setCommunicationEmail] = useState(true);
  const [securityEmail, setSecurityEmail] = useState(true);
  const [socialEmail, setSocialEmail] = useState(true);
  const [notifyMe, setNotifyMe] = useState(false);

  const setCommunicationEmailState = () => {
    if (!notifyMe) {
      setCommunicationEmail(!communicationEmail);
    } else {
      setCommunicationEmail(!communicationEmail);
      setNotifyMe(!notifyMe);
    }
  };

  const setSecurityEmailState = () => {
    if (!notifyMe) {
      setSecurityEmail(!securityEmail);
    } else {
      setSecurityEmail(!securityEmail);
      setNotifyMe(!notifyMe);
    }
  };

  const setSocialEmailState = () => {
    if (!notifyMe) {
      setSocialEmail(!socialEmail);
    } else {
      setSocialEmail(!socialEmail);
      setNotifyMe(!notifyMe);
    }
  };

  const handleDisableAll = () => {
    if (communicationEmail || securityEmail || socialEmail) {
      setCommunicationEmail(false);
      setSecurityEmail(false);
      setSocialEmail(false);
      setNotifyMe(true);
    } else if (!communicationEmail && !securityEmail && !socialEmail) {
      setNotifyMe(!notifyMe);
    } else {
      setNotifyMe(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    toast({
      title: 'You submitted the following values:',
    });
  };

  const onError = error => {
    console.log(error);
  };

  return (
    <div className="container-ns flex w-[74.4vw] flex-col overflow-auto pb-10">
      <div className="group sticky z-30 mx-3 border-b-[1px] border-slate-300 bg-background pb-[14px] pt-8 text-2xl font-light">
        {'Notification'}
      </div>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit({ onSubmit, onError })}>
            <div className="m-3 h-fit w-[98%] rounded-md border-[1px] px-3 py-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Default Notification
                    </FormLabel>
                    <FormDescription className="text-md w-[90%]">
                      {NOTIFICATION.NOTIFICATION_DESCTIOPTION}
                    </FormDescription>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Verified email" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a@gmail.com">
                            {'a@gmail.com'}
                          </SelectItem>
                          <SelectItem value="b@gmail.com">
                            {'b@gmail.com'}
                          </SelectItem>
                          <SelectItem value="c@gmail.com">
                            {'c@gmail.com'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="m-3 h-fit w-[98%] rounded-md border-[1px]">
              <div className="rounded-t-md border-b-[1px] bg-foreground bg-opacity-50 p-3 font-semibold text-background">
                {'Subscription'}
              </div>
              <FormField
                control={form.control}
                name="community_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between border-b-[1px] p-3">
                    <div>
                      <FormLabel className="text-base font-semibold">
                        {'Communication email'}
                      </FormLabel>
                      <FormDescription className="text-md">
                        {NOTIFICATION.COMMUNICATION_DESCRIPTION}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="mt-2"
                        checked={communicationEmail}
                        onCheckedChange={field.onChange}
                        onClick={setCommunicationEmailState}
                      ></Switch>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between border-b-[1px] p-3">
                    <div>
                      <FormLabel className="text-base font-semibold">
                        {'Security email'}
                      </FormLabel>
                      <FormDescription className="text-md">
                        {NOTIFICATION.SECURITY_DESCRIPTION}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="mt-2"
                        checked={securityEmail}
                        onCheckedChange={field.onChange}
                        onClick={setSecurityEmailState}
                      ></Switch>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="social_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between border-b-[1px] p-3">
                    <div>
                      <FormLabel className="text-base font-semibold">
                        {'Social email'}
                      </FormLabel>
                      <FormDescription className="text-md">
                        {NOTIFICATION.SOCIAL_DESCRIPTION}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="mt-2"
                        checked={socialEmail}
                        onCheckedChange={field.onChange}
                        onClick={setSocialEmailState}
                      ></Switch>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notify_me"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between border-b-[1px] p-3">
                    <div>
                      <FormLabel className="text-base font-semibold">
                        {'Don`t notify me'}
                      </FormLabel>
                      <FormDescription className="text-md">
                        {NOTIFICATION.DONT_NOTIFY_DESCRIPTION}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="mt-2"
                        checked={notifyMe}
                        onCheckedChange={field.onChange}
                        onClick={handleDisableAll}
                      ></Switch>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mx-3 mb-2">
              <Button type="submit">{'Save changes'}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default withScrollbarTheme(Notification);
