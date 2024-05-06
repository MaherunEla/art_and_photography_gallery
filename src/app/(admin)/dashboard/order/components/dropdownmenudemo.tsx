"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsDot } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function DropdownMenuDemo({ row }: any) {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  console.log({ row });

  const queryClient = useQueryClient();

  const deleteOrder = async (id: any) => {
    try {
      const response = await axios.delete(`/api/order/${id}`);
      queryClient.invalidateQueries({ queryKey: ["order-data"] });
      console.log(response);
    } catch (error) {
      console.error("An error occurred while deleting the order:", error);
    }
  };

  const ChangeStatus = async (id: any, status: any) => {
    console.log(status);
    try {
      const response = await axios.put(`/api/order/${id}`, { status });
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["order-data"] });
      toast({
        title: "status change successfully ",
      });
    } catch (error) {
      console.error("An error occurred while changing  status:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="active:border active:border-slate-100 rounded-[10px] active:bg-slate-100">
          <IoEllipsisHorizontalOutline />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {["InProgress", "Deliverd", "Cancel", "Pending"].map(
                  (item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <button
                        onClick={() => {
                          ChangeStatus(row.id, item);
                        }}
                      >
                        {item}
                      </button>
                      {item == row.status && <BsDot size={20} />}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex justify-between">
            <Link href={`/dashboard/invoice/${row.id}`}>Invoice</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
