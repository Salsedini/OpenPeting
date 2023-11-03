

export interface UserRepository<User, UserId> {
    find(id: UserId): Promise<User>;
    save(user: User): void;
}
