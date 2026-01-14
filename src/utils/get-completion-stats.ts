export const getCompletionStats = (fields: any[]) => {
  const totalFields = fields.length;
  const completedFields = fields.filter(Boolean).length;
  
  return {
    totalFields,
    completedFields,
    isCompleted: totalFields === completedFields,
    completionText: `(${completedFields}/${totalFields})`,
  };
};
