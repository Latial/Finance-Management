import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Cog, LogOut, Moon, Settings, Sun, User} from "lucide-react";
import React from "react";
import {useLogoutMutation, UserProfileResponse} from "@/lib/redux/api/api";
import {useTheme} from "next-themes";
import config from "@/lib/config";
import Link from "next/link";

interface HeaderActionsProps {
    account: UserProfileResponse
}
export default function ProfileDropdown(props: HeaderActionsProps) {
    const {account} = props
    const email = account.email

    const [logout, logoutResponse] = useLogoutMutation()
    const {setTheme} = useTheme()


    async function handleLogout() {
        localStorage.removeItem(config.LOCAL_STORAGE_TOKEN_KEY)
        await logout()
        window.location.replace("/");
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {<Avatar className="cursor-pointer">
                <AvatarImage src="" alt="Avatar"/>
                <AvatarFallback>
                </AvatarFallback>
            </Avatar>}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <Link href={`/profile/${account.id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4"/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4"/>
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Moon className="mr-2 h-4 w-4"/>
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon className="mr-2 h-4 w-4"/>
                                <span>Dark</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun className="mr-2 h-4 w-4"/>
                                <span>Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Cog className="mr-2 h-4 w-4"/>
                                <span>System</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Log out</span>
                </DropdownMenuItem>

            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}