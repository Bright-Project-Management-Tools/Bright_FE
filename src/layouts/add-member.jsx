import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserRoundPlus, X } from 'lucide-react';


export default function AddMember({ open, onOpenChange }) {
    const [members, setMembers] = useState([
        { name: "Cong Dang", email: "dangcongly06@gmail.com", avatar: "https://github.com/shadcn.png", role: "" },
        { name: "Cong Dang", email: "dangcongly06@gmail.com", avatar: "https://github.com/shadcn.png", role: "" },
        
    ]);
    const [newMemberEmail, setNewMemberEmail] = useState("");

    const addMember = () => {
        setMembers([...members, { name: "New Member", email: newMemberEmail, avatar: "", role: "" }]);
        setNewMemberEmail("");
    };

    const removeMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addMember();
        }
    };


    return (
        <div className="items-center">
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                    <Button
                        className="h-8 border-black/15"
                        variant="outline"
                    >
                        <UserRoundPlus className="h-4" /> Invite
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[475px]">
                    <DialogHeader>
                        <DialogTitle>Add Member</DialogTitle>
                    </DialogHeader>
                    <div className="items-center space-x-2">
                        Invite Members
                        <div className="mt-2 grid flex-1 grid-cols-4 gap-2 ">
                            <Input
                                className="col-span-3"
                                id="email"
                                type="email"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <Button type="submit" size="sm" className="h-10 px-3" onClick={addMember}>
                                Send invite
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 ">
                        Members ({members.length})
                        <ScrollArea className="h-56">
                            <Table>
                                <TableBody>
                                    {members.map((member, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={member.avatar}/>
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <div>{member.name}</div>
                                                <div className='text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px]'>{member.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex flex-cols-2 gap-2'>
                                                    <Select
                                                        value={member.role}
                                                        onValueChange={(value) => {
                                                            const updatedMembers = [...members];
                                                            updatedMembers[index].role = value;
                                                            setMembers(updatedMembers);
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-20'>
                                                            <SelectValue placeholder="Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="owner">Owner</SelectItem>
                                                            <SelectItem value="editor">Editor</SelectItem>
                                                            <SelectItem value="view_only">View Only</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        size="sm"
                                                        className="h-[40px] px-3"
                                                        onClick={() => removeMember(index)}
                                                        variant="outline"
                                                    >
                                                        <X className='h-3'/>
                                                    </Button> 
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                    <div className="items-center space-x-2 mt-4">
                        Copy Link
                        <div className="mt-2 grid grid-cols-4 gap-2">
                            <Input
                                className="col-span-3"
                                id="link"
                                defaultValue="https://ui.shadcn.com/docs/installation"
                                readOnly
                            />  
                            <Button type="submit" size="sm" className="h-10 px-3">
                                Copy 
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}