import * as z from "zod";

export const ImageSchema = z.object({
  prompt: z.string().min(1, { message: "Image Prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    label: "1",
    value: "1 photos",
  },
  {
    label: "2",
    value: "2 photos",
  },
  {
    label: "3",
    value: "3 photos",
  },
  {
    label: "4",
    value: "4 photos",
  },
  {
    label: "5",
    value: "5 photos",
  },
];

export const resolutionOptions = [
  {
    label: "256x256",
    value: "256x256",
  },
  {
    label: "512x512",
    value: "512x512",
  },
  {
    label: "1024x1024",
    value: "1024x1024",
  },
];
