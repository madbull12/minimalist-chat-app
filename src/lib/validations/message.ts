import * as z from 'zod';

export const messageValidator = z.object({
    text:z.string().min(1,"Message can't be empty"),
})