import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl text-center">
        <CardHeader className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Check your email
          </CardTitle>
          <CardDescription>
            We’ve sent a verification link to your email address.  
            Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>

      </Card>
    </div>
  )
}
