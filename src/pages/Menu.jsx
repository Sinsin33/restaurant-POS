import { useRef, useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import ShopingCart from "../components/ShopingCart";
import SortItems from "../components/SortItems";
import NavBar from "../components/NavBar";
import ItemDescription from "../components/ItemDescription";

export default function Menu() {
  const themes = {
    orange: {
      bg: "#FDFBF7",

      text: "text-[#2b2b2b]",
      nav: "#FFF8F0",
      accent: "#ff8c42",
      accentHover: "#ff6a00",
      shadow: "rgba(255, 140, 66, 0.3)",
      button: {
        bg: "#ff8c42",
        hover: "#ff6a00",
      },
    },
    green: {
      bg: "#FAFBF7",
      text: "text-[#2b2b2b]",
      nav: "#F5FAF3",
      accent: "#4caf50",
      accentHover: "#388e3c",
      shadow: "rgba(76, 175, 80, 0.3)",
      button: {
        bg: "#4caf50",
        hover: "#388e3c",
      },
    },
    blue: {
      bg: "#FAFBFD",
      text: "text-[#1c1c1c]",
      nav: "#F4F8FF",
      accent: "#1e88e5",
      accentHover: "#1565c0",
      shadow: "rgba(30, 136, 229, 0.3)",
      button: {
        bg: "#1e88e5",
        hover: "#1565c0",
      },
    },
    red: {
      bg: "#FDF9F9",
      text: "text-[#2b2b2b]",
      nav: "#FFF4F4",
      accent: "#e53935",
      accentHover: "#c62828",
      shadow: "rgba(229, 57, 53, 0.3)",
      button: {
        bg: "#e53935",
        hover: "#c62828",
      },
    },
  };

  const [categories, setCategories] = useState([]);
  const [themeName] = useState("green");
  const theme = themes[themeName];
  const categoryRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [isItemDescriptionOpen, setIsItemDescriptionOpen] = useState(false);
  const cartRef = useRef(null);
  function handleItemClick(item) {
    setClickedItem(item);
    setIsItemDescriptionOpen(true);
  }
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:8000/categories");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setCategories(data);
        setActiveCategory(data[0]?.id || "");
      } catch (err) {
        console.error(err);
      }
    }

    fetchItems();
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found. Login first!");
  //     return;
  //   }

  //   fetch("http://localhost:3001/api/menu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       name: "چلوکباب",
  //       category: "main",
  //       price: 50000,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("Added item:", data))
  //     .catch((err) => console.error("POST failed:", err));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/menu", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu items");
        return res.json();
      })
      .then((data) => console.log("Menu items:", data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    function mouseClickToClose(e) {
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(e.target)
      ) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", mouseClickToClose);
    return () => document.removeEventListener("mousedown", mouseClickToClose);
  }, [isCartOpen]);

  const scrollToCategory = (id) => {
    const el = categoryRefs.current[id];
    if (!el) return;
    const navHeight = document.querySelector(".navBar")?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (!categories.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const handleAddToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === itemToAdd.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === itemToAdd.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };
  const handleDeleteFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };
  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === itemId);
      if (item.quantity > 1) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevCart.filter((i) => i.id !== itemId);
      }
    });
  };

  const handleSortChange = (sortType) => {
    const sortedCategories = categories.map((category) => {
      const sortedItems = [...category.items].sort((a, b) => {
        switch (sortType) {
          case "priceHighest": {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
            return priceB - priceA;
          }
          case "priceLowest": {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));

            return priceA - priceB;
          }

          case "rating":
            return b.rating - a.rating;

          case "sold":
            return b.sold - a.sold;

          case "discount":
            return b.discount - a.discount;

          case "vegan":
            if (a.isVegan && !b.isVegan) return -1;
            if (!a.isVegan && b.isVegan) return 1;
            return 0;

          default:
            return 0;
        }
      });

      return {
        ...category,
        items: sortedItems,
      };
    });

    setCategories(sortedCategories);
  };
  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen ${theme.text}`}
      style={{ backgroundColor: theme.bg }}
      dir="rtl"
    >
      <div className="flex-1 flex flex-col lg:w-3/4">
        <div
          className="navBar sticky top-0 z-40 shadow-md p-2"
          style={{
            backgroundColor: theme.nav,
            boxShadow: `0 2px 6px ${theme.shadow}`,
          }}
        >
          {/* دسته بندی ها */}
          <div className="flex-1 w-full overflow-x-auto mb-3">
            <NavBar
              categories={categories}
              activeCategory={activeCategory}
              scrollToCategory={scrollToCategory}
              theme={theme}
            />
          </div>

          {/* مرتب سازی */}
          <div className="flex justify-end">
            <SortItems onSortChange={handleSortChange} theme={theme} />
          </div>
        </div>

        {/* منو */}
        <div className="p-2 lg:p-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              ref={(el) => (categoryRefs.current[cat.id] = el)}
              id={cat.id}
              className="mb-12 lg:mb-16"
            >
              <h2
                className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 border-b-2 pb-2"
                style={{ borderColor: theme.accent }}
              >
                {cat.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {cat.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onItemClick={() => handleItemClick(item)}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* سبد خرید */}
      <div
        className={`${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0
    fixed lg:sticky top-0 right-0 z-50
    w-full max-w-md lg:w-1/4 lg:max-w-none
    h-screen lg:h-screen
    transition-transform duration-300 ease-in-out`}
      >
        <ShopingCart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
          handleDeleteFromCart={handleDeleteFromCart}
          isMobile={true}
          onClose={() => setIsCartOpen(false)}
          theme={theme}
        />
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 text-white px-5 py-3 rounded-full shadow-lg transition"
        style={{
          backgroundColor: theme.accent,
          boxShadow: `0 4px 10px ${theme.shadow}`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.accentHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = theme.accent)
        }
      >
        🛒 سبد خرید ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </button>

      {isItemDescriptionOpen && clickedItem && (
        <ItemDescription
          item={clickedItem}
          onClose={() => {
            setIsItemDescriptionOpen(false);
            setClickedItem(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
