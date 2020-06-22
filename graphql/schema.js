const { GraphQLObjectType, GraphQLFloat, GraphQLSchema, GraphQLList, GraphQLInputObjectType, GraphQLNonNull, GraphQLID } = require('graphql');

const UserLocation = require('../models/UserLocation');

const UserLocationType = new GraphQLObjectType({
    name: 'UserLocation',
    fields: () => ({
        latitude: { type: new GraphQLNonNull(GraphQLFloat) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) },
        latitudeDelta: { type: GraphQLFloat },
        longitudeDelta: { type: GraphQLFloat },
        id: { type: GraphQLID }
    })
})

const UserLocationInput = new GraphQLInputObjectType({
    name: 'UserLocationInput',
    fields: () => ({
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        latitudeDelta: { type: GraphQLFloat },
        longitudeDelta: { type: GraphQLFloat }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userLocations: {
            type: new GraphQLList(UserLocationType),
            resolve: async () => {
                try {
                    const users = await UserLocation.find();

                    console.log(users);

                    return users.map(user => {
                        return {
                            id: user._id,
                            ...user
                        };
                    })
                }
                catch(err) {
                    console.log(err);

                    throw err;
                }
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUserLocation: {
            type: UserLocationType,
            args: { input: { type: UserLocationInput } },
            resolve: async (_parent, args) => {
                try {
                    const { input } = args;

                    const userLocation = new UserLocation({
                        ...input
                    });

                    const result = await userLocation.save();

                    return {
                        id: result._id,
                        ...result
                    };
                }
                catch(err) {
                    console.log(err);

                    throw err;
                }   
            }   
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})