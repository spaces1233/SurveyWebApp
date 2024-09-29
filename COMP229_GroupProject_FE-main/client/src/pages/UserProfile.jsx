import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUserProfile, updateUserProfile } from "@/api/user";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import useOnlyAllowAuth from "@/hooks/useOnlyAllowAuth";
import useGlobalStore from "@/store/GlobalStore";
import { Formik } from "formik";
import { editValidationSchema } from "@/lib/validations";

const DeleteAccountDialog = ({ onConfirmClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600" onClick={() => setOpen((s) => !s)}>
          Delete My Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={"bg-red-600"}
            onClick={(e) => {
              setOpen(false);
              onConfirmClick(e);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

function UpdateSheet({ initialValues, onUpdateClick }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            ...initialValues,
          }}
          validationSchema={editValidationSchema}
        >
          {({
            values,
            isValid,
            errors,
            touched,
            handleChange,
            handleBlur,
            ...others
          }) => {
            const isButtonDisabled = !isValid || !Object.keys(touched).length;
            return (
              <>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <div className="text-xs text-red-800">
                    {errors.username && touched.username && errors.username}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="text-xs text-red-800">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <div className="text-xs text-red-800">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button disabled={isButtonDisabled} onClick={()=> onUpdateClick(values)} className="mt-3" type="submit">
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </>
            );
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  );
}

export default function UserProfile() {
  useOnlyAllowAuth();
  const { toast } = useToast();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      useGlobalStore.getState().logout();
      toast({
        title: "Account Deleted",
        description: "Account deleted, you are logged out from the system.",
      });
    },
    onError: () => {
      toast({
        title: "Opps",
        description: "Something happen, please try again.",
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      useGlobalStore.getState().logout();
      toast({
        title: "Account Updated",
        description: "Account updated, please login again.",
      });
    },
    onError: () => {
      toast({
        title: "Opps",
        description: "Something happen, please try again.",
      });
    },
  });
  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <div className="font-semibold text-primary">General</div>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">username</span>
                      <span>{query.data?.username}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">email</span>
                      <span>{query.data?.email}</span>
                    </li>
                  </ul>
                </>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <UpdateSheet onUpdateClick={(values)=>{
                  updateMutation.mutate(values)
                }} initialValues={{email: query.data?.email, username: query.data?.username}}/>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Delete My Account</CardTitle>
                <CardDescription>
                  Please be aware that deleting account CANNOT BE UNDONE.
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t px-6 py-4">
                <DeleteAccountDialog
                  onConfirmClick={() => {
                    deleteMutation.mutate();
                  }}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
