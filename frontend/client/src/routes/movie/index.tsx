/*
 * @Author: zdd
 * @Date: 2023-11-23 22:50:41
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 23:14:22
 * @FilePath: index.tsx
 */
import { Image, List } from 'antd-mobile';
import { gql, useQuery } from '@apollo/client';

interface Movie {
  year: number;
  title: string;
  genres: string[];
  actors: { firstName: string; lastName: string }[];
}

function Home() {
  const { loading, error, data } = useQuery<{ movies: Movie[] }>(
    gql`
      {
        movies(search: "Girl") {
          year
          title
          genres
          actors {
            firstName
            lastName
          }
        }
      }
    `
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <List header="电影列表">
      {data?.movies.map((item) => (
        <List.Item key={item.title} prefix={item.year}>
          {item.title}
          <br />
          {item.genres.map((genre) => (
            <span key={genre}> {genre} </span>
          ))}
          <br />
          {item.actors.map((actor) => (
            <span key={actor.firstName + actor.lastName}>
              {actor.firstName} {actor.lastName},
            </span>
          ))}
        </List.Item>
      ))}
    </List>
  );
}

export default Home;
