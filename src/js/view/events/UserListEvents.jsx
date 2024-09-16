/**
 * Enum: UserListEvents
 */

class UserListEvents {}

const BASE = "events/user/list/";
UserListEvents.NEW      = BASE + "new";
UserListEvents.SELECT   = BASE + "select";
UserListEvents.DELETE   = BASE + "delete";

UserListEvents.LIST     = [
    UserListEvents.NEW,
    UserListEvents.SELECT,
    UserListEvents.DELETE
];

export default UserListEvents;