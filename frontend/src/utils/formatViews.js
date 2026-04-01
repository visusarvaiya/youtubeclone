export const formatViews = (views) => {
    if (!views) return "0";
    
    // Handle array of viewer IDs if present
    const count = Array.isArray(views) ? views.length : Number(views);
    
    if (isNaN(count)) return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };