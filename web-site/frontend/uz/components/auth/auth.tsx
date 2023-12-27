import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";

const Auth: React.FC = () => {
  return (
    <DialogContent className="sm:max-w-[600px] w-full">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Kirish</TabsTrigger>
          <TabsTrigger value="password">{`Ro'yxatdan o'tish`}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="password">
          <Register />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default Auth;
