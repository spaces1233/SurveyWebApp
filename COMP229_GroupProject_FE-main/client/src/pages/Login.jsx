import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useOnlyAllowUnAuth from "@/hooks/useOnlyAllowUnAuth";
import SignUpForm from "@/components/forms/SignUpForm";
import LoginForm from "@/components/forms/SignInForm";

function Login() {
  useOnlyAllowUnAuth();

  return (
    <div className="min-h-screen">
      <div className="w-full min-h-screen h-1 lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <Tabs defaultValue="login" className="w-full sm:w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm
                  title={"Login"}
                  description={"Please enter your email and password to login"}
                />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm
                  title={"Sign up"}
                  description={
                    "Please enter username, email and password to create account"
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden bg-muted lg:block h-full relative">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1721858125140-57077cfc8b1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1721858125140-57077cfc8b1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
