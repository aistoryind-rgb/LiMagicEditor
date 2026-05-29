import { 
  VEHICLE_DB 
} from './vehicleDb';
import { 
  CLOTHING_DB 
} from './clothingDb';
import { 
  ITEMS_DB, 
  BUSINESSES_DB, 
  OFFICIAL_PLACES, 
  UNOFFICIAL_PLACES, 
  REAL_ESTATE_ORDER, 
  ILLEGAL_ITEMS, 
  REJECTION_ONLY_ITEMS, 
  BANNED_CONTENT, 
  SPELLING_CORRECTIONS 
} from './rules';

export interface ProcessedAdResult {
  status: 'passed' | 'rejected' | 'blacklisted' | 'pending';
  rawText: string;
  processedText: string;
  category: string;
  action: 'Selling' | 'Buying' | 'Trading' | 'Renting' | 'Other';
  rejectionReason: string;
  blacklistReason: string;
  logs: string[];
}

export class AdProcessor {
  /**
   * Calculate the Levenshtein distance between two strings
   */
  public static levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Get the closest match from a list of strings using Levenshtein distance
   */
  public static getClosestMatch(input: string, list: string[], threshold = 0.6): string | null {
    if (!input || !list || list.length === 0) return null;
    let bestMatch: string | null = null;
    let maxSimilarity = 0;

    const cleanInput = input.trim().toLowerCase();

    for (const item of list) {
      const cleanItem = item.trim().toLowerCase();

      // Exact match
      if (cleanInput === cleanItem) {
        return item;
      }

      // Substring check
      if (cleanItem.includes(cleanInput) || cleanInput.includes(cleanItem)) {
        let similarity = Math.min(cleanInput.length, cleanItem.length) / Math.max(cleanInput.length, cleanItem.length);
        if (cleanItem.startsWith(cleanInput)) similarity += 0.2;
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          bestMatch = item;
        }
      }

      // Levenshtein check
      const dist = this.levenshteinDistance(cleanInput, cleanItem);
      const maxLength = Math.max(cleanInput.length, cleanItem.length);
      const similarity = 1 - (dist / maxLength);

      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestMatch = item;
      }
    }

    return maxSimilarity >= threshold ? bestMatch : null;
  }

  /**
   * Detect the primary action (Selling, Buying, Trading, Renting) from raw text
   */
  public static detectAction(text: string): 'Selling' | 'Buying' | 'Trading' | 'Renting' | 'Other' {
    const lower = text.toLowerCase();

    // Check for dating targets or personal ads which always map to "Buying/Looking"
    const isDatingSearch = /\b(look|looking|search|searching|want|find|finding)\b/i.test(lower);
    const hasDatingTarget = /\b(wife|girlfriend|boyfriend|husband|valentine|date|spouse|soulmate)\b/i.test(lower) || 
                            (/\b(friend|friends|family|family\s+members)\b/i.test(lower) && /\b(look|looking|search|searching)\b/i.test(lower));
    if (isDatingSearch && hasDatingTarget && !lower.includes("family business")) {
      return "Buying";
    }

    const buyPatterns = [/\bbuying\b/i, /\blook for\b/i, /\blooking to buy\b/i, /\blooking to purchase\b/i, /\bbuy\b/i, /\bwant to buy\b/i, /\bwtb\b/i];
    const sellPatterns = [
      /\bselling or trading\b/i, /\bsell or trade\b/i, /\bselling\/trading\b/i, /\bwts\/wtt\b/i,
      /\brenting out\b/i, /\brent out\b/i, /\brenting\b/i, /\brent\b/i,
      /\btrading\b/i, /\btrade\b/i, /\bwtt\b/i, /\bselling\b/i, /\bsell\b/i, /\bwts\b/i
    ];

    let firstBuyIdx = -1;
    for (const pat of buyPatterns) {
      const match = lower.match(pat);
      if (match && match.index !== undefined) {
        if (firstBuyIdx === -1 || match.index < firstBuyIdx) {
          firstBuyIdx = match.index;
        }
      }
    }

    let firstSellIdx = -1;
    for (const pat of sellPatterns) {
      const match = lower.match(pat);
      if (match && match.index !== undefined) {
        if (firstSellIdx === -1 || match.index < firstSellIdx) {
          firstSellIdx = match.index;
        }
      }
    }

    if (firstBuyIdx !== -1 && firstSellIdx !== -1) {
      return firstBuyIdx < firstSellIdx ? "Buying" : "Selling";
    } else if (firstBuyIdx !== -1) {
      return "Buying";
    } else if (firstSellIdx !== -1) {
      return "Selling";
    }

    if (/\btrade\b/i.test(lower) || /\btrading\b/i.test(lower)) return "Trading";
    if (/\brent\b/i.test(lower) || /\brenting\b/i.test(lower)) return "Renting";

    return "Selling"; // Default fallback
  }

  /**
   * Maps real life brands to GRP lore friendly brands
   */
  public static mapBrands(text: string, type: 'vehicle' | 'clothing'): string {
    let result = text.toLowerCase();
    if (type === 'vehicle') {
      result = result.replace(/\bmercedes(?:\s*-?\s*benz)?\b/gi, "benefactor");
      result = result.replace(/\bamg\b/gi, "benefactor");
      result = result.replace(/\bbmw\b/gi, "ubermacht");
      result = result.replace(/\baudi\b/gi, "obey");
      result = result.replace(/\bporsche\b/gi, "pfister");
      result = result.replace(/\blamborghini\b/gi, "pegassi");
      result = result.replace(/\blambo\b/gi, "pegassi");
      result = result.replace(/\bbugatti\b/gi, "truffade");
      result = result.replace(/\brolls\s*-?\s*royce\b/gi, "enus");
      result = result.replace(/\brr\b/gi, "enus");
      result = result.replace(/\blexus\b/gi, "emperor");
      result = result.replace(/\btoyota\b/gi, "karin");
      result = result.replace(/\bnissan\b/gi, "annis");
      result = result.replace(/\btesla\b/gi, "coil");
      result = result.replace(/\brange\s*rover\b/gi, "gallivanter");
      result = result.replace(/\bford\b/gi, "vapid");
      result = result.replace(/\bchevrolet\b/gi, "declasse");
      result = result.replace(/\bchevy\b/gi, "declasse");
      result = result.replace(/\bferrari\b/gi, "grotti");
      result = result.replace(/\bitaly\b/gi, "italia");
      result = result.replace(/\bg-wagon\b/gi, "g63");
      result = result.replace(/\bhuracan\b/gi, "performante");
      result = result.replace(/\bskyline\b/gi, "skyline gt-r");
      result = result.replace(/\blvn\b/gi, "la voiture noire");
      result = result.replace(/\bgt-?r\s*(?:1|i)\b/gi, "gt-r i");
      result = result.replace(/\bgtr\b/gi, "gt-r");
    } else {
      result = result.replace(/\badidas\b/g, "abibas");
      result = result.replace(/\bgucci\b/g, "muci");
      result = result.replace(/\blouis vuitton\b/g, "lui vi");
      result = result.replace(/\blv\b/g, "lui vi");
      result = result.replace(/\bnike\b/g, "niki");
      result = result.replace(/\bpikachu\b/g, "mikachu");
      result = result.replace(/\brolex\b/g, "kolex");
      result = result.replace(/\bsocial hoodie\b/g, "social club hoodie");
      result = result.replace(/\btype mask\b/g, "tight mask");
      result = result.replace(/\bdesert scarf\b(?!\s*mask)/g, "desert scarf mask");
      result = result.replace(/\btied scarf\b(?!\s*mask)/g, "tied scarf mask");
      result = result.replace(/\bface scarf\b(?!\s*mask)/g, "face scarf mask");
      result = result.replace(/\bneck scarf\b(?!\s*mask)/g, "neck scarf mask");
    }
    return result;
  }

  /**
   * Correct spelling and formatting of terms
   */
  public static correctSpelling(text: string, logs: string[]): string {
    let corrected = text;

    // Protect prices
    const protectedPrices: string[] = [];
    corrected = corrected.replace(/\b(?:\d+(?:[\.,]\d+)*\s*(?:k|m|mil|ml|million|billion|b|trillion)\b|\$\s*\d+(?:[\.,]\d+)*)/gi, (match) => {
      protectedPrices.push(match);
      return `__PROTECTED_PRICE_${protectedPrices.length - 1}__`;
    });

    // Normalize percentages
    const pctPrefixMatch = corrected.match(/%(\d+)\b/);
    if (pctPrefixMatch) {
      corrected = corrected.replace(/%(\d+)\b/g, "$1%");
      logs.push(`Normalized percentage notation: <strong>%${pctPrefixMatch[1]}</strong> corrected to <strong>${pctPrefixMatch[1]}%</strong>`);
    }

    // Apply strict dictionary corrections
    const sortedEntries = Object.entries(SPELLING_CORRECTIONS).sort((a, b) => b[0].length - a[0].length);
    for (const [wrong, right] of sortedEntries) {
      let regex: RegExp;
      if (wrong === "lui") {
        regex = /\blui\b(?! vi\b)/gi;
      } else {
        const escapedWrong = wrong.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const startBoundary = /^\w/.test(wrong) ? '\\b' : '';
        const endBoundary = /\w$/.test(wrong) ? '\\b' : '';
        regex = new RegExp(`${startBoundary}${escapedWrong}${endBoundary}`, "gi");
      }
      if (regex.test(corrected)) {
        logs.push(`Spelling correction: <strong>${wrong}</strong> corrected to <strong>${right}</strong>`);
        corrected = corrected.replace(regex, right);
      }
    }

    // Fix house numbers
    corrected = corrected.replace(/\b(house|apartment|mansion|penthouse|shop)\s*(?:no\.?|number|num\.?|#)?\s*(\d+)\b/gi, (match, prop, num) => {
      return `${prop.charAt(0).toUpperCase() + prop.slice(1).toLowerCase()} №${num}`;
    });

    // Restore protected prices
    corrected = corrected.replace(/__PROTECTED_PRICE_(\d+)__/g, (match, idx) => {
      return protectedPrices[parseInt(idx)];
    });

    return corrected;
  }

  /**
   * Central Pipeline Processing Engine
   */
  public static process(raw: string, overrideCategory = 'auto'): ProcessedAdResult {
    const logs: string[] = [];
    let status: 'passed' | 'rejected' | 'blacklisted' | 'pending' = 'passed';
    let rejectionReason = "";
    let blacklistReason = "";

    const trimmed = raw.trim();
    if (!trimmed) {
      return {
        status: 'pending',
        rawText: raw,
        processedText: '',
        category: 'Other',
        action: 'Selling',
        rejectionReason: '',
        blacklistReason: '',
        logs: []
      };
    }

    // 1. Initial Spelling and Format Correction
    let processed = this.correctSpelling(trimmed, logs);
    const action = this.detectAction(processed);

    // 2. Blacklist / Prohibited Checks
    const lowerText = processed.toLowerCase();
    for (const illegal of ILLEGAL_ITEMS) {
      if (lowerText.includes(illegal)) {
        status = 'blacklisted';
        blacklistReason = `Prohibited Item Found: "${illegal.toUpperCase()}". LifeInvader policies ban the advertisement of weapons, drugs, ammunition, body scanners, and EMS gear.`;
        logs.push(`🚨 Blacklist Warning: Found prohibited term "${illegal}"`);
        break;
      }
    }

    if (status !== 'blacklisted') {
      for (const rej of REJECTION_ONLY_ITEMS) {
        if (lowerText.includes(rej)) {
          status = 'rejected';
          rejectionReason = `Policy Violation: Advertising "${rej.toUpperCase()}" is prohibited. This item must be rejected immediately according to the handbook.`;
          logs.push(`❌ Rejection Rule triggered: Prohibited item "${rej}"`);
          break;
        }
      }
    }

    if (status === 'passed') {
      for (const banned of BANNED_CONTENT) {
        if (lowerText.includes(banned)) {
          status = 'rejected';
          rejectionReason = `Content Policy: The reference to "${banned.toUpperCase()}" is explicitly banned on advertisement panels.`;
          logs.push(`❌ Content Policy rejection: Found banned reference "${banned}"`);
          break;
        }
      }
    }

    // 3. Category Auto Detection
    let category = "Other";
    if (overrideCategory && overrideCategory !== 'auto') {
      category = overrideCategory;
      logs.push(`Category manually overridden to: <strong>${category}</strong>`);
    } else {
      // Auto detect
      if (lowerText.includes("house") || lowerText.includes("apartment") || lowerText.includes("re ") || lowerText.includes("garage") || lowerText.includes("penthouse")) {
        category = "Real Estate";
      } else if (lowerText.includes("car") || lowerText.includes("vehicle") || lowerText.includes("chiron") || lowerText.includes("sandking") || lowerText.includes("m5") || lowerText.includes("drift")) {
        category = "Auto";
      } else if (lowerText.includes("girlfriend") || lowerText.includes("boyfriend") || lowerText.includes("dating") || lowerText.includes("wife") || lowerText.includes("husband")) {
        category = "Dating";
      } else if (lowerText.includes("looking for work") || lowerText.includes("hiring") || lowerText.includes("employment")) {
        category = "Work";
      } else if (lowerText.includes("repair") || lowerText.includes("service") || lowerText.includes("tuning") || lowerText.includes("gps")) {
        category = "Services";
      } else if (lowerText.includes("discount") || lowerText.includes("off") || lowerText.includes("sale")) {
        category = "Discounts";
      } else {
        // Vehicle database fuzzy check for auto detection
        let isVehicle = false;
        const mappedInput = this.mapBrands(lowerText, 'vehicle');
        for (const cat in VEHICLE_DB) {
          const list = VEHICLE_DB[cat as keyof typeof VEHICLE_DB];
          if (list.some(v => mappedInput.includes(v.toLowerCase()))) {
            isVehicle = true;
            break;
          }
        }
        if (isVehicle) {
          category = "Auto";
        }
      }
      logs.push(`Auto-detected category: <strong>${category}</strong>`);
    }

    // 4. Formatting Output Text according to strict GRP grammar
    let outputText = processed;

    // Prices and action capitalization
    if (status === 'passed') {
      // Ensure it starts with capitalized Action
      const actionPrefix = action === "Buying" ? "Buying" : "Selling";
      const regexPrefix = new RegExp(`^(?:buying|selling|trading|renting|buy|sell|trade|rent)\\s+`, "i");
      
      outputText = outputText.replace(regexPrefix, "");
      outputText = outputText.charAt(0).toUpperCase() + outputText.slice(1);
      
      // Clean duplicate action verbs
      outputText = `${actionPrefix} ${outputText.charAt(0).toLowerCase() + outputText.slice(1)}`;
      
      // Ensure period at the end
      if (!outputText.endsWith(".") && !/\d$/.test(outputText)) {
        outputText += ".";
      }

      // Convert k/m/mil indicators in price into fully formatted numbers
      // e.g. 12m -> $12,000,000 or 350k -> $350,000
      outputText = outputText.replace(/\b(\d+)(?:\s*)(k|m|mil|million)\b/gi, (match, num, mult) => {
        const val = parseInt(num);
        let multiplier = 1;
        if (mult.toLowerCase() === 'k') multiplier = 1000;
        else if (mult.toLowerCase().startsWith('m')) multiplier = 1000000;
        
        const finalVal = val * multiplier;
        const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalVal);
        logs.push(`Formatted price quantity: <strong>${match}</strong> to <strong>${formatted}</strong>`);
        return formatted;
      });

      // Price / Budget prefixes
      if (action === "Buying") {
        outputText = outputText.replace(/\b(?:budget|price|for)\b\s*[:.-]?\s*\$/gi, "Budget: $");
      } else {
        outputText = outputText.replace(/\b(?:price|budget|for)\b\s*[:.-]?\s*\$/gi, "Price: $");
      }
    }

    return {
      status,
      rawText: raw,
      processedText: outputText,
      category,
      action,
      rejectionReason,
      blacklistReason,
      logs
    };
  }
}
