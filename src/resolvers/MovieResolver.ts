import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
    @Field()
    title: string

    @Field(() => Int)
    minutes: number
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string

    @Field(() => Int, { nullable: true })
    minutes?: number
}

@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    async createMovie( @Arg("options", () => MovieInput) options: MovieInput ) {
        const movie = await Movie.create(options).save(); 
        return movie;
    }

    @Mutation(() => Boolean) 
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMovie( @Arg("Id", () => Int) id: number ){
        await Movie.delete({id});
        return true;
    }

    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }
}

// const typeDefs = gql`
//     type Mutation {
//         createMovie(title: String, minutes: Int): Boolean!
//     }

//     type Query {
//         movies: [Movie!]!
//     }

//     type Movie {
//         title: String!
//         minutes: Int!
//     }
// `