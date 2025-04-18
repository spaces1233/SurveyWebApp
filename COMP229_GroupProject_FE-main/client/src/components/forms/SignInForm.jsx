import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/api/auth";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { signInValidationSchema } from "@/lib/validations";
import useGlobalStore from "@/store/GlobalStore";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const SignInForm = ({ title, description, onSumbit = () => {} }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const mutation = useMutation({
    mutationFn: signIn,
    onMutate: () => {
      setError(null);
    },
    onError: (error) => {
      setError(error?.message ?? "Something went wrong, please enter again");
    },
    onSuccess: ({ token }) => {
      if (token) {
        useGlobalStore.getState().login({ token });
        navigate("/");
      } else {
        setError("Something went wrong, please enter again");
      }
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
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
        const isButtonDisabled =
          !isValid || !Object.keys(touched).length || mutation.isPending;
        return (
          <Card>
            <CardHeader>
              <CardTitle className="">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Opps</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button
                disabled={isButtonDisabled}
                onClick={() => {
                  mutation.mutate(values);
                }}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
