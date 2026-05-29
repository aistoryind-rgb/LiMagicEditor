import React, { useState, useMemo } from 'react';
import { VEHICLE_DB } from '../engine/vehicleDb.ts';
import { CLOTHING_DB } from '../engine/clothingDb.ts';
import { ITEMS_DB, BUSINESSES_DB } from '../engine/rules.ts';

export const DatabaseExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'vehicles' | 'clothing' | 'items' | 'businesses'>('all');

  const catIconMap: Record<string, { icon: string; cls: string }> = {
    helicopters: { icon: "fa-helicopter", cls: "cat-plane" },
    boats: { icon: "fa-ship", cls: "cat-boat" },
    planes: { icon: "fa-plane", cls: "cat-plane" },
    motorcycles: { icon: "fa-motorcycle", cls: "cat-motorcycle" },
    sellable_cars: { icon: "fa-car-side", cls: "cat-car-sell" },
    not_sellable_cars: { icon: "fa-car-side", cls: "cat-car-rent" }
  };

  const clothingIcons: Record<string, string> = {
    MASKS: "fa-mask", BACKPACKS: "fa-backpack", ACCESSORY: "fa-gem",
    WATCH: "fa-clock", Dress: "fa-shirt", PANTS: "fa-person",
    SHOES: "fa-shoe-prints", TOPS: "fa-shirt", HATS: "fa-hat-cowboy",
    "ANIMATED ITEMS": "fa-sparkles", "SPATIAL SOUND EFFECTS": "fa-volume-high"
  };

  const itemIcons: Record<string, string> = {
    tickets: "fa-ticket",
    containers: "fa-box-open",
    pets: "fa-paw",
    tools: "fa-screwdriver-wrench",
    resources: "fa-gem",
    fish: "fa-fish",
    gardening: "fa-seedling",
    juices: "fa-flask",
    subscriptions: "fa-star",
    others: "fa-icons"
  };

  const dbItems = useMemo(() => {
    const items: Array<{
      name: string;
      type: 'Vehicle' | 'Clothing' | 'Item' | 'Business';
      subtype: string;
      badgeClass: string;
      details: string;
      statusText: string;
      statusClass: string;
      thumbIcon: string;
      thumbClass: string;
    }> = [];

    const term = searchQuery.toLowerCase().trim();

    // 1. Vehicles
    if (activeFilter === 'all' || activeFilter === 'vehicles') {
      Object.keys(VEHICLE_DB).forEach((cat) => {
        const list = VEHICLE_DB[cat as keyof typeof VEHICLE_DB];
        const iconInfo = catIconMap[cat] || { icon: "fa-car", cls: "cat-car-sell" };
        list.forEach((name) => {
          if (name.toLowerCase().includes(term) || !term) {
            const isNotSellable = cat === "not_sellable_cars";
            items.push({
              name,
              type: 'Vehicle',
              subtype: cat.replace('_', ' '),
              badgeClass: 'vehicle',
              details: isNotSellable ? 'RENT ONLY (Non-sellable)' : 'Sellable & Rentable',
              statusText: isNotSellable ? 'RENT ONLY' : 'SELLABLE',
              statusClass: isNotSellable ? 'status-not-sellable' : 'status-sellable',
              thumbIcon: iconInfo.icon,
              thumbClass: iconInfo.cls
            });
          }
        });
      });
    }

    // 2. Clothing
    if (activeFilter === 'all' || activeFilter === 'clothing') {
      const addClothing = (gender: 'male' | 'female', catName: string, list: string[]) => {
        list.forEach((name) => {
          if (name.toLowerCase().includes(term) || !term) {
            items.push({
              name,
              type: 'Clothing',
              subtype: `${gender.toUpperCase()} - ${catName}`,
              badgeClass: 'clothing',
              details: `Official clothing database item (${gender})`,
              statusText: 'VALID CLOTHING',
              statusClass: 'status-sellable',
              thumbIcon: clothingIcons[catName] || "fa-shirt",
              thumbClass: "cat-clothing"
            });
          }
        });
      };

      Object.keys(CLOTHING_DB.male).forEach((cat) => {
        addClothing('male', cat, CLOTHING_DB.male[cat as keyof typeof CLOTHING_DB.male] || []);
      });
      Object.keys(CLOTHING_DB.female).forEach((cat) => {
        addClothing('female', cat, CLOTHING_DB.female[cat as keyof typeof CLOTHING_DB.female] || []);
      });
    }

    // 3. Items
    if (activeFilter === 'all' || activeFilter === 'items') {
      Object.keys(ITEMS_DB).forEach((cat) => {
        const list = ITEMS_DB[cat as keyof typeof ITEMS_DB];
        const icon = itemIcons[cat] || "fa-cubes";
        list.forEach((name) => {
          if (name.toLowerCase().includes(term) || !term) {
            items.push({
              name,
              type: 'Item',
              subtype: cat.charAt(0).toUpperCase() + cat.slice(1),
              badgeClass: 'item',
              details: `Official GRP items table (${cat})`,
              statusText: 'VALID ITEM',
              statusClass: 'status-sellable',
              thumbIcon: icon,
              thumbClass: 'cat-item'
            });
          }
        });
      });
    }

    // 4. Businesses
    if (activeFilter === 'all' || activeFilter === 'businesses') {
      BUSINESSES_DB.forEach((name) => {
        if (name.toLowerCase().includes(term) || !term) {
          items.push({
            name,
            type: 'Business',
            subtype: 'Business Type',
            badgeClass: 'business',
            details: 'Official GRP Business classification',
            statusText: 'VALID BUSINESS',
            statusClass: 'status-sellable',
            thumbIcon: "fa-briefcase",
            thumbClass: "cat-motorcycle"
          });
        }
      });
    }

    return items;
  }, [searchQuery, activeFilter]);

  const handleCopyItem = (name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      alert(`Copied "${name}" to clipboard!`);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Search Explorer Bar */}
      <div className="search-bar-container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div className="search-input-wrapper" style={{ flexGrow: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Search vehicles, clothing, items, businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '16px' }}
          />
        </div>
        <div className="db-filters" style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'vehicles', 'clothing', 'items', 'businesses'] as const).map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              style={{
                background: activeFilter === filter ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of matches */}
      <div className="db-results-grid">
        {dbItems.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            No databases items found matching the query.
          </div>
        ) : (
          dbItems.slice(0, 100).map((item, idx) => (
            <div
              key={idx}
              className="db-card"
              onDoubleClick={() => handleCopyItem(item.name)}
              title="Double-click to copy item name"
            >
              <div className={`db-card-thumb ${item.thumbClass}`}>
                <i className={`fa-solid ${item.thumbIcon}`}></i>
              </div>
              <div className="db-card-body">
                <div className="db-card-header">
                  <span className="db-item-name">{item.name}</span>
                  <span className={`db-item-badge ${item.badgeClass}`}>{item.type}</span>
                </div>
                <div className="db-item-detail">
                  Category: <strong>{item.subtype}</strong>
                </div>
                <div 
                  className="db-item-status" 
                  style={{ 
                    fontSize: '11px', 
                    marginTop: '4px',
                    color: item.statusClass === 'status-sellable' ? 'var(--color-success)' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <i className={`fa-solid ${item.statusClass === 'status-sellable' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                  {item.statusText}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
