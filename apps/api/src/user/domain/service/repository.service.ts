
export interface UserRepository<User, UserId> {
    delete(user: User): void;
    find(id: UserId): Promise<User> | null;
    save(user: User): void;
}
