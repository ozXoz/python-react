import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from models import User as UserModel

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel

class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_users(self, info):
        query = User.get_query(info)
        return query.all()

class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean()
    user = graphene.Field(lambda: User)

    def mutate(self, info, username, password):
        new_user = UserModel(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return CreateUser(user=new_user, ok=True)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
