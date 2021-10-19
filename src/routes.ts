import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAutehticated";

const router = Router();

router.post("/authenticate" , new AuthenticateUserController().handle);

router.post(
    "/messages",
    ensureAuthenticated,
    new CreateMessageController().handle
    );

router.get("/messages/Last3", new Get3LastMessagesController().handle)

router.get("/profile", ensureAuthenticated , new ProfileUserController().handle)

export { router }