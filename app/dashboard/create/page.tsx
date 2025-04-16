
import { handleSubmission } from "@/app/actions";
import { Submitbuton } from "@/components/general/Submitbutton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function CreateBlogRoute() {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>create a new post</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmission}>
            <div className="flex flex-col gap-2">
              <Label>Post Title</Label>
              <Input
                name="title"
                required
                type="text"
                placeholder="Post Title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Post Content</Label>
              <Textarea name="content" required placeholder="Post Title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Post Image</Label>
              <Input
                name="url"
                required
                type="url"
                placeholder="Post Image Url"
              />
            </div>

            <Submitbuton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
