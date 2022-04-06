import { UserGoogleDAO } from "../../../dao";
import { EntityManager, InsertResult } from "typeorm";
import { ControllerError } from "../../../error/ControllerError";
import { ErrorCode } from "../../../ErrorCode";

export class ServiceUserGoogle {
    constructor(private readonly userUUID: string) {}

    public async create(
        data: {
            userName: string;
            unionUUID: string;
        },
        t?: EntityManager,
    ): Promise<InsertResult> {
        const { userName, unionUUID } = data;

        return await UserGoogleDAO(t).insert({
            user_uuid: this.userUUID,
            user_name: userName,
            union_uuid: unionUUID,
        });
    }

    public async assertExist(): Promise<void> {
        const result = await UserGoogleDAO().findOne(["id"], {
            user_uuid: this.userUUID,
        });

        if (result === undefined) {
            throw new ControllerError(ErrorCode.UserNotFound);
        }
    }

    public static async userUUIDByUnionUUID(unionUUID: string): Promise<string | null> {
        const result = await UserGoogleDAO().findOne(["user_uuid"], {
            union_uuid: String(unionUUID),
        });

        return result ? result.user_uuid : null;
    }
}
