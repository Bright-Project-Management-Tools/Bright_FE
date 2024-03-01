import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LinkIcon } from "lucide-react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import userImage from '../asset/cat.jpg'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formShcema = z.object({
    username: z.string().trim()
        .min(2, { message: "Username is too short " })
        .max(50),
    nickname: z.string().trim()
        .max(50),
    bio: z.string()
        .min(0, { message: "Please tell me about more about you"})
        .max(200, { message: "The bio exceeds the 200-character limit. Please condense it." }),
    pronouns: z.string(),
    url: z.string()
        .optional(),
    social_account1: z.string(),
    social_account2: z.string(),
    social_account3: z.string(),
    social_account4: z.string(),
    email_address: z.string()
        .email(),
    phone_number: z.number()
        .optional(),
    country: z.string(),
    dob: z.date(),
})

function Profile() {
    const [date, setDate] = useState(Date);

    const form = useForm({
        resolver: zodResolver(formShcema),
        defaultValues: {
            username: '',
            nickname: '',
        }
    })

    const onSubmit = () => {
        console.log("Submitted")
    }

    const onError = (error) => {
        console.log(error)
    }

    return (
        <div className="container-ns flex flex-col w-[75vw] overflow-auto h-screen">
            <div className="mx-3 text-lg font-bold top-0 p-2 border-b-[1px] border-slate-300 group sticky bg-white z-40">
                Public Profile
            </div>
            <div className="flex flex-row overflow-x-scroll no-scrollbar">
                <div className="w-9/12 px-5 py-3 h-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className='h-fit'>
                            <div id="name-container" className="flex flex-row w-full gap-7">
                                {/* Username */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-5/12">
                                            <FormLabel className="font-semibold text-md">Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} className="h-[35px]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Nickname */}
                                <FormField
                                    control={form.control}
                                    name="nickname"
                                    render={({ field }) => (
                                        <FormItem className="w-5/12">
                                            <FormLabel className="font-semibold text-md">Nickname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nickname" {...field} className="h-[35px]" />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div id="bio" className="pt-3 w-full" >
                                {/* Bio */}
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-md">Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little about yourself"
                                                    className="w-8/12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div id="pronouns" className="pt-3 w-full">
                                {/* Pronouns */}
                                <FormField
                                    control={form.control}
                                    name="pronouns"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-md">Pronouns</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValues={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-8/12 h-[35px]">
                                                        <SelectValue placeholder="Don't Specify" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="a">Don't Specify</SelectItem>
                                                    <SelectItem value="b">they/them</SelectItem>
                                                    <SelectItem value="c">he/him</SelectItem>
                                                    <SelectItem value="d">she/her</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div id="url" className="pt-3 w-full">
                                {/* URL */}
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-md font-semibold">URL</FormLabel>
                                            <FormControl>
                                                <Input className="w-8/12 h-[35px]" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div id="social-account" className="pt-3 w-full">
                                {/* Social Accounts */}
                                <FormField
                                    control={form.control}
                                    name="social_account"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-md">Social Account</FormLabel>
                                            <FormControl className="flex flex-row gap-y-2 pt-1">
                                                <div>
                                                    <LinkIcon className="w-5 h-5 mt-2 mr-2" />
                                                    <Input placeholder="Link to social profile" className="w-10/12 h-[35px]" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormControl className="flex flex-row gap-y-2 pt-1">
                                                <div>
                                                    <LinkIcon className="w-5 h-5 mt-2 mr-2" />
                                                    <Input placeholder="Link to social profile" className="w-10/12 h-[35px]" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormControl className="flex flex-row gap-y-2 pt-1">
                                                <div>
                                                    <LinkIcon className="w-5 h-5 mt-2 mr-2" />
                                                    <Input placeholder="Link to social profile" className="w-10/12 h-[35px]" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormControl className="flex flex-row gap-y-2 pt-1">
                                                <div>
                                                    <LinkIcon className="w-5 h-5 mt-2 mr-2" />
                                                    <Input placeholder="Link to social profile" className="w-10/12 h-[35px]" {...field} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div id="personal" className="my-3 pt-3 border-t-[1px] border-slate-300 text-lg font-semibold">
                                Personal Information
                            </div>
                            <div id="personal-container-1" className="w-full flex flex-row gap-7 mb-3">
                                {/* Email Address */}
                                <div id="email_address" className="w-5/12">
                                    <FormField
                                        control={form.control}
                                        name="email_address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-md">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email Address" type="email" className="h-[35px]" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Country */}
                                <div id='country' className="w-5/12">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-md">Country</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValues={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-8/12 h-[35px]">
                                                            <SelectValue placeholder="Select Your Country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="vn-VN">Vietnam</SelectItem>
                                                        <SelectItem value="us-US">United State</SelectItem>
                                                        <SelectItem value="en-EN">England</SelectItem>
                                                        <SelectItem value="jp-JP">Japan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div id="personal-content-2" className="flex flex-row w-full gap-7">
                                <div id="phone_number" className="w-5/12">
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-md">Phone number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone number" type="number" className="h-[35px]" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div id='date-of-birth'>
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="font-semibold text-md">Date of birth</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] h-[35px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button className="mt-5 mb-3 h-[35px]">Update Profile</Button>
                        </form>
                    </Form>
                </div>
                <div className="w-3/12 relative z-0">
                    <img src={userImage} alt="" className='h-50 w-50 rounded-full p-5' />
                    <Button class="absolute top-10 w-[60px] bg-black text-white p-2 rounded-sm hover:bg-slate-900 m-2">
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile