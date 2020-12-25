import { Column, Entity, Index } from "typeorm";
import { Content } from "../Content";

@Entity({
    name: "room_cyclical",
})
export class RoomCyclicalModel extends Content {
    @Column({
        length: 40,
    })
    cyclical_uuid: string;

    @Index("room_cyclical_fake_room_uuid_uindex", {
        unique: true,
    })
    @Column({
        length: 40,
    })
    fake_room_uuid: string;

    @Index("room_cyclical_room_type_index")
    @Column({
        type: "tinyint",
        comment: "room type(one to one: 0 / small class: 1 / big class: 2",
    })
    room_type: number;

    @Index("room_cyclical_begin_time_index")
    @Column({
        type: "datetime",
        precision: 3,
        comment: "room begin time",
    })
    begin_time: Date;

    @Column({
        type: "datetime",
        precision: 3,
        comment: "room end time",
    })
    end_time: Date;

    @Index("room_cyclical_is_delete_index")
    @Column({
        default: false,
    })
    is_delete: boolean;
}