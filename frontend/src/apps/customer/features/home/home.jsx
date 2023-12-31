import { Slider } from "../../../../components";

const slides = [
  "Slide 1",
  "Slide 2",
  "Slide 3",
  "Slide 4",
  "Slide 5",
  "Slide 6",
  "Slide 7",
  "Slide 8",
  "Slide 9",
  "Slide 10",
  "Slide 11",
  "Slide 12",
  "Slide 13",
];

const Home = () => {
  const itemWidth = 144;
  const containerGap = 16;

  return (
    <main className="container space-y-4 py-10">
      <section>
        <h1 className="mb-4 text-2xl font-bold">React Tailwind Slider</h1>
        <Slider
          items={slides}
          itemWidth={itemWidth}
          containerGap={containerGap}
        />
      </section>
    </main>
  );
};

export default Home;
