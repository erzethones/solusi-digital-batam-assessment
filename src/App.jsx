import { useState } from "react";
import "./App.css";

import mockData from "./data/mockData.json";

import Layout from "./components/Layout/Layout";
import Topbar from "./components/Layout/Topbar";
import Sidebar from "./components/Layout/Sidebar";
import PromoBanner from "./components/PromoBanner";
import QuestionFilter from "./components/Questions/QuestionFilter";
import QuestionList from "./components/Questions/QuestionList";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeNavId, setActiveNavId] = useState(3);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cards, setCards] = useState(mockData.cards);
  const [olderCards, setOlderCards] = useState(mockData.olderCards);

  const filterCards = (list, filterId) => {
    if (filterId === "all") return list;
    if (filterId === "new") return list.filter((c) => c.isNew);
    if (filterId === "standard")
      return list.filter((c) => c.package.name.toLowerCase() === "standart");
    if (filterId === "plus")
      return list.filter((c) => c.package.name.toLowerCase() === "plus");
    if (filterId === "premium")
      return list.filter((c) => c.package.name.toLowerCase() === "premium");
    return list;
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleNavClick = (navId) => {
    setActiveNavId(navId);
    setSidebarOpen(false);
  };

  const handleDismissBanner = () => {
    setBannerDismissed(true);
  };

  const handleToggleCard = (cardId) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, expanded: !c.expanded } : c)),
    );
    setOlderCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, expanded: !c.expanded } : c)),
    );
  };

  const handleSecureCard = (cardId) => {
    console.log("Sichern:", cardId);
  };

  const handleDismissCard = (cardId) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    setOlderCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleReport = (cardId) => {
    console.log("Melden:", cardId);
  };

  const handleWrongCategory = (cardId) => {
    console.log("Falsches Rechtsgebiet:", cardId);
  };

  const sidebar = (
    <Sidebar
      navigation={mockData.navigation}
      navigationSpecial={mockData.navigationSpecial}
      specialLabel={mockData.labels.specialSectionLabel}
      activeNavId={activeNavId}
      onNavClick={handleNavClick}
      isOpen={sidebarOpen}
    />
  );

  const topbar = (
    <Topbar
      breadcrumb={mockData.breadcrumb}
      searchPlaceholder={mockData.labels.searchPlaceholder}
      user={mockData.user}
      onMenuToggle={() => setSidebarOpen((prev) => !prev)}
    />
  );

  return (
    <Layout
      sidebar={sidebar}
      topbar={topbar}
      sidebarOpen={sidebarOpen}
      onCloseSidebar={() => setSidebarOpen(false)}
    >
      <QuestionFilter
        filters={mockData.filters}
        activeFilterId={activeFilter}
        onFilterChange={handleFilterChange}
        onSort={() => console.log("sort")}
        onFilter={() => console.log("filter")}
        pageTitle={mockData.labels.pageTitle}
        sortLabel={mockData.labels.sortButton}
        filterLabel={mockData.labels.filterButton}
      />

      {!bannerDismissed && (
        <PromoBanner
          title={mockData.banner.title}
          subtitle={mockData.banner.subtitle}
          dismissible={mockData.banner.dismissible}
          onDismiss={handleDismissBanner}
        />
      )}

      <QuestionList
        cards={filterCards(cards, activeFilter)}
        olderCards={filterCards(olderCards, activeFilter)}
        olderSectionLabel={mockData.labels.olderSectionLabel}
        tableHeaders={mockData.labels.tableHeaders}
        onToggle={handleToggleCard}
        onSecure={handleSecureCard}
        onDismiss={handleDismissCard}
        onReport={handleReport}
        onWrongCategory={handleWrongCategory}
      />
    </Layout>
  );
}
