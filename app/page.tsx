import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared"

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {/* <ProductCard
                id={1}
                imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg"
                name=""
                price={0}
              /> */}
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                  {
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.jpg",
                    name: "Пиццы",
                    items: [{ price: 500 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
