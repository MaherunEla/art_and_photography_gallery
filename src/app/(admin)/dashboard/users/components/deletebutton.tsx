"use client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Deletebutton = (id: any) => {
  console.log({ id });
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const deleteUser = async (id: any) => {
    try {
      const response = await axios.delete(`/api/signup/${id.id}`);
      queryClient.invalidateQueries({ queryKey: ["signup-data"] });
      console.log(response);
    } catch (error) {
      console.error("An error occurred while deleting the order:", error);
    }
  };
  return (
    <button
      onClick={() => {
        deleteUser(id);
        toast({
          title: "Product Deleted successfully ",
        });
      }}
      className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-red-600"
    >
      Delete
    </button>
  );
};

export default Deletebutton;
