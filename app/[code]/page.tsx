export default async function LinkRedirect({
  params,
}: {
  params: { slug: string };
}) {
  const options = {
    method: "GET",
    body: JSON.stringify(params.slug),
  };

  console.log(params.slug);

  //   await fetch("/api/shorten", options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });

  return <h1>test</h1>;
}
