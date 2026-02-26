import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const TRANSLATIONS = {
  it: {
    months: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
    days: ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],
    appSubtitle: "Budget Familiare",
    // Main tabs
    tabEntrate: "Entrate", tabBudget: "Budget", tabSpese: "Spese", tabCasa: "Casa",
    // Sub tabs
    subPlan: "Plan", subDaily: "Daily", subOverview: "Overview",
    subUscite: "Uscite", subStorico: "Storico",
    subBollette: "Bollette", subGrafici: "Grafici", subPellet: "Pellet",
    // Settings
    settingsTitle: "Impostazioni", settingsPerson1: "Persona 1", settingsPerson2: "Persona 2",
    settingsSave: "Salva modifiche", settingsStart: "Inizia →", settingsCancel: "Annulla",
    settingsLang: "Lingua",
    settingsOnboardingTitle: "Inserisci i nomi delle due persone per iniziare",
    // Export/Import
    exportImportTitle: "Esporta / Importa", exportTitle: "Esporta dati",
    exportDesc: "Copia il testo qui sotto e salvalo. Incollalo nella sezione Importa su un altro dispositivo.",
    exportCopy: "📋 Copia negli appunti",
    importTitle: "Importa dati",
    importDesc: "Incolla qui il testo esportato da un altro dispositivo.",
    importWarning: "I dati attuali verranno sovrascritti.",
    importBtn: "Importa e sostituisci",
    importOk: "✅ Dati importati con successo!",
    importErr: "❌ Formato non valido. Assicurati di incollare il testo completo.",
    // Entrate
    contribution: "Contributo famiglia", familyTotal: "Totale famiglia",
    // Plan
    planWarning: "Inserisci gli stipendi in Entrate per il calcolo automatico",
    copyFromPrev: "Copia Plan da", overwrite: "(sovrascrive)",
    copyConfirm: "Sovrascrivere", copyWith: "con i valori di",
    copyYes: "Sì, copia", addItem: "+ Aggiungi voce",
    planSummary: "Riepilogo", grandTotal: "Totale Plan",
    // Daily
    dailyBudget: "Budget Mensile", remaining: "Rimanente",
    spent: "Speso", initialAvg: "Media/Giorno iniziale",
    updatedAvg: "Media/Giorno oggi", daysLeft: "giorni rimasti",
    budgetUse: "Utilizzo budget", todayMarker: "oggi",
    noPlanData: "Inserisci i valori nel Plan → Revolut Cointestato per attivare il Daily Budget",
    // Uscite
    newExpense: "+ Nuova Spesa", editExpense: "✏️ Modifica Spesa",
    saveExpense: "Salva Spesa", saveChanges: "💾 Salva Modifiche",
    category: "Categoria", merchant: "Esercente / Descrizione",
    merchantPlaceholder: "es. Esselunga, Zara...", date: "Data", amount: "Importo",
    noExpenses: "Nessuna spesa questo mese", noFilter: "Nessuna spesa con questo filtro",
    allCategories: "Tutte le categorie", byCategory: "Per Categoria",
    totalMonth: "Totale", numExpenses: "spese",
    sortDateDesc: "Data ↓", sortDateAsc: "Data ↑", sortAmountDesc: "Importo ↓", sortByCat: "Categoria",
    // Storico
    storicoTitle: "Storico Entrate", noData: "Nessun dato ancora",
    // Bollette
    bolletteTitle: "Bollette", yearSummary: "Riepilogo Annuale",
    monthlyDetail: "Dettaglio Mensile — tocca un campo per modificarlo",
    netLuce: "Luce netta", pannelliCredit: "PANNELLI (credito)", luceSpesa: "LUCE (spesa)",
    delete: "Elimina", note: "NOTE",
    // Grafici
    graficiTitle: "Grafici Bollette", monthlyTrend: "Andamento Mensile", yearlyTotals: "Totale per Anno",
    luceNetta: "Luce Netta (Luce − Pannelli)", gasePellet: "Gas e Pellet", gasePelletAnno: "Gas e Pellet per Anno",
    luceAnno: "Luce per Anno", acquaAnno: "Acqua per Anno",
    noGraficiData: "Inserisci dati nelle Bollette per vedere i grafici",
    // Pellet
    pelletTitle: "Tracker Pellet 🪵", currentStatus: "Situazione attuale",
    bagsLeft: "sacchi rimasti", avgPerDay: "Media/giorno", bags: "sacchi",
    totalBought: "Totale comprati", addRow: "➕ Nuova riga", editRow: "✏️ Modifica riga",
    bought: "🛒 Comprati", consumed: "🔥 Consumati", add: "Aggiungi",
    daysRemain: "giorni", finishOn: "finiscono il", noTracking: "Aggiungi la prima riga per iniziare il tracking",
    // Overview
    overviewTitle: "Overview", monthlyPlan: "Piano Mensile", familyMonthly: "Totale Famiglia — Ultimi mesi",
    essential: "Essential", extra: "Extra", saving: "Saving",
    // Categories
    catSpesa: "Spesa", catMangiare: "Mangiare Fuori", catProgrammati: "Programmati",
    catShopping: "Shopping", catVarie: "Varie", catDivertimento: "Divertimento",
    catSalute: "Salute", catTrasporti: "Trasporti", catServizi: "Servizi",
    // Sections
    sectionComune: "COMUNE", sectionPersonale: "PERSONALE", sectionRisparmi: "RISPARMI",
    autoSplit: "split auto %", manualSplit: "manuali",
    revolut: "Revolut Cointestato", spent: "Speso", perDay: "€/giorno", dayLabel: "giorno", monthlyPlanLabel: "Piano Mensile", familyMonthlyLabel: "Totale Famiglia — Ultimi mesi",
  },
  en: {
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    appSubtitle: "Family Budget",
    tabEntrate: "Income", tabBudget: "Budget", tabSpese: "Expenses", tabCasa: "Home",
    subPlan: "Plan", subDaily: "Daily", subOverview: "Overview",
    subUscite: "Expenses", subStorico: "History",
    subBollette: "Bills", subGrafici: "Charts", subPellet: "Pellet",
    settingsTitle: "Settings", settingsPerson1: "Person 1", settingsPerson2: "Person 2",
    settingsSave: "Save changes", settingsStart: "Start →", settingsCancel: "Cancel",
    settingsLang: "Language",
    settingsOnboardingTitle: "Enter the names of the two people to get started",
    exportImportTitle: "Export / Import", exportTitle: "Export data",
    exportDesc: "Copy the text below and save it. Paste it in the Import section on another device.",
    exportCopy: "📋 Copy to clipboard",
    importTitle: "Import data",
    importDesc: "Paste here the text exported from another device.",
    importWarning: "Current data will be overwritten.",
    importBtn: "Import and replace",
    importOk: "✅ Data imported successfully!",
    importErr: "❌ Invalid format. Make sure you paste the full text.",
    contribution: "Family contribution", familyTotal: "Family total",
    planWarning: "Enter salaries in Income for automatic calculation",
    copyFromPrev: "Copy Plan from", overwrite: "(overwrites)",
    copyConfirm: "Overwrite", copyWith: "with values from",
    copyYes: "Yes, copy", addItem: "+ Add item",
    planSummary: "Summary", grandTotal: "Total Plan",
    dailyBudget: "Monthly Budget", remaining: "Remaining",
    spent: "Spent", initialAvg: "Initial avg/day",
    updatedAvg: "Today's avg/day", daysLeft: "days left",
    budgetUse: "Budget usage", todayMarker: "today",
    noPlanData: "Enter values in Plan → Revolut Cointestato to activate Daily Budget",
    newExpense: "+ New Expense", editExpense: "✏️ Edit Expense",
    saveExpense: "Save Expense", saveChanges: "💾 Save Changes",
    category: "Category", merchant: "Merchant / Description",
    merchantPlaceholder: "e.g. Amazon, Zara...", date: "Date", amount: "Amount",
    noExpenses: "No expenses this month", noFilter: "No expenses with this filter",
    allCategories: "All categories", byCategory: "By Category",
    totalMonth: "Total", numExpenses: "expenses",
    sortDateDesc: "Date ↓", sortDateAsc: "Date ↑", sortAmountDesc: "Amount ↓", sortByCat: "Category",
    storicoTitle: "Income History", noData: "No data yet",
    bolletteTitle: "Bills", yearSummary: "Yearly Summary",
    monthlyDetail: "Monthly Detail — tap a field to edit",
    netLuce: "Net electricity", pannelliCredit: "SOLAR PANELS (credit)", luceSpesa: "ELECTRICITY (expense)",
    delete: "Delete", note: "NOTES",
    graficiTitle: "Bill Charts", monthlyTrend: "Monthly Trend", yearlyTotals: "Yearly Totals",
    luceNetta: "Net Electricity (Elec − Solar)", gasePellet: "Gas & Pellet", gasePelletAnno: "Gas & Pellet per Year",
    luceAnno: "Electricity per Year", acquaAnno: "Water per Year",
    noGraficiData: "Enter bill data to see charts",
    pelletTitle: "Pellet Tracker 🪵", currentStatus: "Current status",
    bagsLeft: "bags remaining", avgPerDay: "Avg/day", bags: "bags",
    totalBought: "Total bought", addRow: "➕ New row", editRow: "✏️ Edit row",
    bought: "🛒 Bought", consumed: "🔥 Consumed", add: "Add",
    daysRemain: "days", finishOn: "run out on", noTracking: "Add first row to start tracking",
    overviewTitle: "Overview", monthlyPlan: "Monthly Plan", familyMonthly: "Family Total — Last months",
    essential: "Essential", extra: "Extra", saving: "Saving",
    catSpesa: "Groceries", catMangiare: "Eating Out", catProgrammati: "Scheduled",
    catShopping: "Shopping", catVarie: "Misc", catDivertimento: "Entertainment",
    catSalute: "Health", catTrasporti: "Transport", catServizi: "Services",
    sectionComune: "SHARED", sectionPersonale: "PERSONAL", sectionRisparmi: "SAVINGS",
    autoSplit: "auto split %", manualSplit: "manual",
    revolut: "Joint Revolut", spent: "Spent", perDay: "€/day", dayLabel: "day", monthlyPlanLabel: "Monthly Plan", familyMonthlyLabel: "Family Total — Last months",
  },
  es: {
    months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    days: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
    appSubtitle: "Presupuesto Familiar",
    tabEntrate: "Ingresos", tabBudget: "Presupuesto", tabSpese: "Gastos", tabCasa: "Casa",
    subPlan: "Plan", subDaily: "Diario", subOverview: "Resumen",
    subUscite: "Gastos", subStorico: "Historial",
    subBollette: "Facturas", subGrafici: "Gráficos", subPellet: "Pellet",
    settingsTitle: "Ajustes", settingsPerson1: "Persona 1", settingsPerson2: "Persona 2",
    settingsSave: "Guardar cambios", settingsStart: "Empezar →", settingsCancel: "Cancelar",
    settingsLang: "Idioma",
    settingsOnboardingTitle: "Introduce los nombres de las dos personas para empezar",
    exportImportTitle: "Exportar / Importar", exportTitle: "Exportar datos",
    exportDesc: "Copia el texto y guárdalo. Pégalo en Importar en otro dispositivo.",
    exportCopy: "📋 Copiar al portapapeles",
    importTitle: "Importar datos",
    importDesc: "Pega aquí el texto exportado desde otro dispositivo.",
    importWarning: "Los datos actuales serán sobreescritos.",
    importBtn: "Importar y reemplazar",
    importOk: "✅ ¡Datos importados con éxito!",
    importErr: "❌ Formato no válido. Asegúrate de pegar el texto completo.",
    contribution: "Contribución familiar", familyTotal: "Total familiar",
    planWarning: "Introduce los sueldos en Ingresos para el cálculo automático",
    copyFromPrev: "Copiar Plan de", overwrite: "(sobreescribe)",
    copyConfirm: "¿Sobreescribir", copyWith: "con los valores de",
    copyYes: "Sí, copiar", addItem: "+ Añadir elemento",
    planSummary: "Resumen", grandTotal: "Total Plan",
    dailyBudget: "Presupuesto Mensual", remaining: "Restante",
    spent: "Gastado", initialAvg: "Media/día inicial",
    updatedAvg: "Media/día hoy", daysLeft: "días restantes",
    budgetUse: "Uso del presupuesto", todayMarker: "hoy",
    noPlanData: "Introduce valores en Plan → Revolut Cointestato para activar el Diario",
    newExpense: "+ Nuevo Gasto", editExpense: "✏️ Editar Gasto",
    saveExpense: "Guardar Gasto", saveChanges: "💾 Guardar Cambios",
    category: "Categoría", merchant: "Comercio / Descripción",
    merchantPlaceholder: "ej. Mercadona, Zara...", date: "Fecha", amount: "Importe",
    noExpenses: "Sin gastos este mes", noFilter: "Sin gastos con este filtro",
    allCategories: "Todas las categorías", byCategory: "Por Categoría",
    totalMonth: "Total", numExpenses: "gastos",
    sortDateDesc: "Fecha ↓", sortDateAsc: "Fecha ↑", sortAmountDesc: "Importe ↓", sortByCat: "Categoría",
    storicoTitle: "Historial de Ingresos", noData: "Sin datos todavía",
    bolletteTitle: "Facturas", yearSummary: "Resumen Anual",
    monthlyDetail: "Detalle Mensual — toca un campo para editar",
    netLuce: "Electricidad neta", pannelliCredit: "PANELES SOLARES (crédito)", luceSpesa: "ELECTRICIDAD (gasto)",
    delete: "Eliminar", note: "NOTAS",
    graficiTitle: "Gráficos Facturas", monthlyTrend: "Tendencia Mensual", yearlyTotals: "Totales Anuales",
    luceNetta: "Electricidad neta (Elec − Solar)", gasePellet: "Gas y Pellet", gasePelletAnno: "Gas y Pellet por Año",
    luceAnno: "Electricidad por Año", acquaAnno: "Agua por Año",
    noGraficiData: "Introduce datos en Facturas para ver los gráficos",
    pelletTitle: "Tracker Pellet 🪵", currentStatus: "Situación actual",
    bagsLeft: "sacos restantes", avgPerDay: "Media/día", bags: "sacos",
    totalBought: "Total comprado", addRow: "➕ Nueva fila", editRow: "✏️ Editar fila",
    bought: "🛒 Comprados", consumed: "🔥 Consumidos", add: "Añadir",
    daysRemain: "días", finishOn: "se acaban el", noTracking: "Añade la primera fila para empezar",
    overviewTitle: "Resumen", monthlyPlan: "Plan Mensual", familyMonthly: "Total Familiar — Últimos meses",
    essential: "Esencial", extra: "Extra", saving: "Ahorro",
    catSpesa: "Compras", catMangiare: "Comer Fuera", catProgrammati: "Programados",
    catShopping: "Compras", catVarie: "Varios", catDivertimento: "Entretenimiento",
    catSalute: "Salud", catTrasporti: "Transporte", catServizi: "Servicios",
    sectionComune: "COMÚN", sectionPersonale: "PERSONAL", sectionRisparmi: "AHORROS",
    autoSplit: "reparto auto %", manualSplit: "manual",
    revolut: "Revolut Conjunto", spent: "Gastado", perDay: "€/día", dayLabel: "día", monthlyPlanLabel: "Plan Mensual", familyMonthlyLabel: "Total Familiar — Últimos meses",
  },
  de: {
    months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    days: ["So","Mo","Di","Mi","Do","Fr","Sa"],
    appSubtitle: "Familienbudget",
    tabEntrate: "Einnahmen", tabBudget: "Budget", tabSpese: "Ausgaben", tabCasa: "Haus",
    subPlan: "Plan", subDaily: "Täglich", subOverview: "Übersicht",
    subUscite: "Ausgaben", subStorico: "Verlauf",
    subBollette: "Rechnungen", subGrafici: "Diagramme", subPellet: "Pellet",
    settingsTitle: "Einstellungen", settingsPerson1: "Person 1", settingsPerson2: "Person 2",
    settingsSave: "Änderungen speichern", settingsStart: "Starten →", settingsCancel: "Abbrechen",
    settingsLang: "Sprache",
    settingsOnboardingTitle: "Namen der zwei Personen eingeben um zu starten",
    exportImportTitle: "Exportieren / Importieren", exportTitle: "Daten exportieren",
    exportDesc: "Kopiere den Text und speichere ihn. Füge ihn auf einem anderen Gerät ein.",
    exportCopy: "📋 In Zwischenablage kopieren",
    importTitle: "Daten importieren",
    importDesc: "Füge hier den exportierten Text von einem anderen Gerät ein.",
    importWarning: "Aktuelle Daten werden überschrieben.",
    importBtn: "Importieren und ersetzen",
    importOk: "✅ Daten erfolgreich importiert!",
    importErr: "❌ Ungültiges Format. Stelle sicher, dass du den vollständigen Text einfügst.",
    contribution: "Familienbeitrag", familyTotal: "Familien-Gesamt",
    planWarning: "Gehälter in Einnahmen eingeben für automatische Berechnung",
    copyFromPrev: "Plan kopieren von", overwrite: "(überschreibt)",
    copyConfirm: "Überschreiben", copyWith: "mit Werten von",
    copyYes: "Ja, kopieren", addItem: "+ Eintrag hinzufügen",
    planSummary: "Zusammenfassung", grandTotal: "Plan Gesamt",
    dailyBudget: "Monatsbudget", remaining: "Verbleibend",
    spent: "Ausgegeben", initialAvg: "Ø/Tag (initial)",
    updatedAvg: "Ø/Tag (heute)", daysLeft: "Tage verbleibend",
    budgetUse: "Budgetnutzung", todayMarker: "heute",
    noPlanData: "Werte im Plan eingeben um das Tagesbudget zu aktivieren",
    newExpense: "+ Neue Ausgabe", editExpense: "✏️ Ausgabe bearbeiten",
    saveExpense: "Ausgabe speichern", saveChanges: "💾 Änderungen speichern",
    category: "Kategorie", merchant: "Händler / Beschreibung",
    merchantPlaceholder: "z.B. Lidl, Zara...", date: "Datum", amount: "Betrag",
    noExpenses: "Keine Ausgaben diesen Monat", noFilter: "Keine Ausgaben mit diesem Filter",
    allCategories: "Alle Kategorien", byCategory: "Nach Kategorie",
    totalMonth: "Gesamt", numExpenses: "Ausgaben",
    sortDateDesc: "Datum ↓", sortDateAsc: "Datum ↑", sortAmountDesc: "Betrag ↓", sortByCat: "Kategorie",
    storicoTitle: "Einnahmenverlauf", noData: "Noch keine Daten",
    bolletteTitle: "Rechnungen", yearSummary: "Jahreszusammenfassung",
    monthlyDetail: "Monatsdetail — Feld antippen zum Bearbeiten",
    netLuce: "Netto-Strom", pannelliCredit: "SOLARANLAGE (Gutschrift)", luceSpesa: "STROM (Ausgabe)",
    delete: "Löschen", note: "NOTIZEN",
    graficiTitle: "Rechnungsdiagramme", monthlyTrend: "Monatlicher Trend", yearlyTotals: "Jahreszahlen",
    luceNetta: "Netto-Strom (Strom − Solar)", gasePellet: "Gas & Pellet", gasePelletAnno: "Gas & Pellet pro Jahr",
    luceAnno: "Strom pro Jahr", acquaAnno: "Wasser pro Jahr",
    noGraficiData: "Rechnungsdaten eingeben um Diagramme zu sehen",
    pelletTitle: "Pellet-Tracker 🪵", currentStatus: "Aktuelle Lage",
    bagsLeft: "Säcke verbleibend", avgPerDay: "Ø/Tag", bags: "Säcke",
    totalBought: "Gesamt gekauft", addRow: "➕ Neue Zeile", editRow: "✏️ Zeile bearbeiten",
    bought: "🛒 Gekauft", consumed: "🔥 Verbraucht", add: "Hinzufügen",
    daysRemain: "Tage", finishOn: "gehen aus am", noTracking: "Erste Zeile hinzufügen um zu starten",
    overviewTitle: "Übersicht", monthlyPlan: "Monatsplan", familyMonthly: "Familie Gesamt — Letzte Monate",
    essential: "Wesentlich", extra: "Extra", saving: "Ersparnisse",
    catSpesa: "Einkauf", catMangiare: "Essen gehen", catProgrammati: "Geplant",
    catShopping: "Shopping", catVarie: "Sonstiges", catDivertimento: "Unterhaltung",
    catSalute: "Gesundheit", catTrasporti: "Transport", catServizi: "Dienste",
    sectionComune: "GEMEINSAM", sectionPersonale: "PERSÖNLICH", sectionRisparmi: "ERSPARNISSE",
    autoSplit: "auto Aufteilung %", manualSplit: "manuell",
    revolut: "Gemeinsames Revolut", spent: "Ausgegeben", perDay: "€/Tag", dayLabel: "Tag", monthlyPlanLabel: "Monatsplan", familyMonthlyLabel: "Familie Gesamt — Letzte Monate",
  },
  fr: {
    months: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    days: ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
    appSubtitle: "Budget Familial",
    tabEntrate: "Revenus", tabBudget: "Budget", tabSpese: "Dépenses", tabCasa: "Maison",
    subPlan: "Plan", subDaily: "Quotidien", subOverview: "Aperçu",
    subUscite: "Dépenses", subStorico: "Historique",
    subBollette: "Factures", subGrafici: "Graphiques", subPellet: "Pellet",
    settingsTitle: "Paramètres", settingsPerson1: "Personne 1", settingsPerson2: "Personne 2",
    settingsSave: "Enregistrer", settingsStart: "Commencer →", settingsCancel: "Annuler",
    settingsLang: "Langue",
    settingsOnboardingTitle: "Entrez les noms des deux personnes pour commencer",
    exportImportTitle: "Exporter / Importer", exportTitle: "Exporter les données",
    exportDesc: "Copiez le texte ci-dessous. Collez-le dans Importer sur un autre appareil.",
    exportCopy: "📋 Copier dans le presse-papiers",
    importTitle: "Importer les données",
    importDesc: "Collez ici le texte exporté depuis un autre appareil.",
    importWarning: "Les données actuelles seront écrasées.",
    importBtn: "Importer et remplacer",
    importOk: "✅ Données importées avec succès !",
    importErr: "❌ Format invalide. Assurez-vous de coller le texte complet.",
    contribution: "Contribution familiale", familyTotal: "Total familial",
    planWarning: "Entrez les salaires dans Revenus pour le calcul automatique",
    copyFromPrev: "Copier le Plan de", overwrite: "(écrase)",
    copyConfirm: "Écraser", copyWith: "avec les valeurs de",
    copyYes: "Oui, copier", addItem: "+ Ajouter un élément",
    planSummary: "Récapitulatif", grandTotal: "Total Plan",
    dailyBudget: "Budget Mensuel", remaining: "Restant",
    spent: "Dépensé", initialAvg: "Moy/jour initial",
    updatedAvg: "Moy/jour aujourd'hui", daysLeft: "jours restants",
    budgetUse: "Utilisation budget", todayMarker: "aujourd'hui",
    noPlanData: "Entrez des valeurs dans Plan → Revolut Cointestato pour activer le Budget Quotidien",
    newExpense: "+ Nouvelle Dépense", editExpense: "✏️ Modifier Dépense",
    saveExpense: "Enregistrer", saveChanges: "💾 Enregistrer",
    category: "Catégorie", merchant: "Commerçant / Description",
    merchantPlaceholder: "ex. Carrefour, Zara...", date: "Date", amount: "Montant",
    noExpenses: "Aucune dépense ce mois", noFilter: "Aucune dépense avec ce filtre",
    allCategories: "Toutes les catégories", byCategory: "Par Catégorie",
    totalMonth: "Total", numExpenses: "dépenses",
    sortDateDesc: "Date ↓", sortDateAsc: "Date ↑", sortAmountDesc: "Montant ↓", sortByCat: "Catégorie",
    storicoTitle: "Historique des Revenus", noData: "Pas encore de données",
    bolletteTitle: "Factures", yearSummary: "Récapitulatif Annuel",
    monthlyDetail: "Détail Mensuel — touchez un champ pour modifier",
    netLuce: "Électricité nette", pannelliCredit: "PANNEAUX SOLAIRES (crédit)", luceSpesa: "ÉLECTRICITÉ (dépense)",
    delete: "Supprimer", note: "NOTES",
    graficiTitle: "Graphiques Factures", monthlyTrend: "Tendance Mensuelle", yearlyTotals: "Totaux Annuels",
    luceNetta: "Électricité nette (Élec − Solaire)", gasePellet: "Gaz & Pellet", gasePelletAnno: "Gaz & Pellet par An",
    luceAnno: "Électricité par An", acquaAnno: "Eau par An",
    noGraficiData: "Entrez des données dans Factures pour voir les graphiques",
    pelletTitle: "Tracker Pellet 🪵", currentStatus: "Situation actuelle",
    bagsLeft: "sacs restants", avgPerDay: "Moy/jour", bags: "sacs",
    totalBought: "Total acheté", addRow: "➕ Nouvelle ligne", editRow: "✏️ Modifier ligne",
    bought: "🛒 Achetés", consumed: "🔥 Consommés", add: "Ajouter",
    daysRemain: "jours", finishOn: "se terminent le", noTracking: "Ajoutez la première ligne pour commencer",
    overviewTitle: "Aperçu", monthlyPlan: "Plan Mensuel", familyMonthly: "Total Famille — Derniers mois",
    essential: "Essentiel", extra: "Extra", saving: "Épargne",
    catSpesa: "Courses", catMangiare: "Resto", catProgrammati: "Programmés",
    catShopping: "Shopping", catVarie: "Divers", catDivertimento: "Loisirs",
    catSalute: "Santé", catTrasporti: "Transport", catServizi: "Services",
    sectionComune: "COMMUN", sectionPersonale: "PERSONNEL", sectionRisparmi: "ÉPARGNE",
    autoSplit: "répartition auto %", manualSplit: "manuel",
    revolut: "Revolut Commun", spent: "Dépensé", perDay: "€/jour", dayLabel: "jour", monthlyPlanLabel: "Plan Mensuel", familyMonthlyLabel: "Total Famille — Derniers mois",
  },
};

const LANG_OPTIONS = [
  { code: "it", label: "🇮🇹 Italiano" },
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "fr", label: "🇫🇷 Français" },
];
const YEARS = [2024, 2025, 2026, 2027];

const CATEGORIE_BASE = [
  { id: "spesa",          tKey: "catSpesa",        color: "#e67e22", bg: "rgba(230,126,34,0.2)" },
  { id: "mangiare_fuori", tKey: "catMangiare",     color: "#27ae60", bg: "rgba(39,174,96,0.2)" },
  { id: "programmati",    tKey: "catProgrammati",  color: "#2980b9", bg: "rgba(41,128,185,0.2)" },
  { id: "shopping",       tKey: "catShopping",     color: "#8e44ad", bg: "rgba(142,68,173,0.2)" },
  { id: "varie",          tKey: "catVarie",        color: "#7f8c8d", bg: "rgba(127,140,141,0.2)" },
  { id: "divertimento",   tKey: "catDivertimento", color: "#16a085", bg: "rgba(22,160,133,0.2)" },
  { id: "salute",         tKey: "catSalute",       color: "#e74c3c", bg: "rgba(231,76,60,0.2)" },
  { id: "trasporti",      tKey: "catTrasporti",    color: "#c0392b", bg: "rgba(192,57,43,0.2)" },
  { id: "servizi",        tKey: "catServizi",      color: "#2c3e50", bg: "rgba(44,62,80,0.2)" },
];

const PLAN_STRUCTURE = [
  {
    id: "revolut_cointestato", label: "Revolut Cointestato", section: "COMUNE", splitMode: "auto",
    color: "#c0392b", bg: "rgba(192,57,43,0.13)", borderColor: "rgba(192,57,43,0.35)", pill: "#c0392b",
    items: [
      { id: "spese_essenziali", name: "Spese Essenziali", desc: "", cat: "essential" },
      { id: "netflix", name: "Netflix", desc: "Visa Condivisa Diego", day: 3, cat: "extra" },
      { id: "discovery", name: "Discovery+", desc: "Visa Condivisa Diego", day: 8, cat: "extra" },
      { id: "icloud", name: "iCloud+ Apple", desc: "Visa Condivisa Diego", day: 6, cat: "extra" },
      { id: "disney", name: "Disney+", desc: "Visa Condivisa Diego", day: 10, cat: "extra" },
      { id: "assic_betty", name: "Assicurazione Betty", desc: "", day: 4, cat: "essential" },
      { id: "telethon", name: "Telethon", desc: "", day: 16, cat: "extra" },
      { id: "amazon_prime", name: "Amazon Prime", desc: "Visa Condivisa Diego", day: 19, cat: "extra" },
      { id: "paramount", name: "Paramount", desc: "Visa Condivisa Diego", day: 18, cat: "extra" },
      { id: "youtube", name: "Youtube Premium", desc: "Visa Condivisa Diego", day: 28, cat: "extra" },
      { id: "hello_fresh", name: "Hello Fresh", desc: "", cat: "extra" },
      { id: "easypark", name: "EasyPark", desc: "Visa Condivisa Diego", cat: "extra" },
    ],
  },
  {
    id: "vaults", label: "Vaults", section: "COMUNE", splitMode: "auto",
    color: "#d35400", bg: "rgba(211,84,0,0.10)", borderColor: "rgba(211,84,0,0.32)", pill: "#d35400",
    items: [
      { id: "contanti", name: "Contanti", desc: "", cat: "essential" },
      { id: "mutuo", name: "Mutuo", desc: "Rata 28° (€800) + Interessi Passivi Annuali Marzo (€1.500)", cat: "essential" },
      { id: "scuole", name: "Scuole Puzzetti", desc: "Mensa + Doposcuola + LingoKids", cat: "essential" },
      { id: "bollette", name: "Bollette", desc: "Enel + Telepass + Fastweb (15°) + Prima assic. Casa (€313,90 ann. 04/12)", cat: "essential" },
      { id: "macchina", name: "Macchina", desc: "Ass. RCA Conte.it €415 ann. | Finanziamento €568,21/mese | Anticipo dopo 4 anni €12.000", cat: "essential" },
      { id: "assic_medica", name: "Assicurazione Medica", desc: "UniSalute", cat: "essential" },
      { id: "pulizia_casa", name: "Pulizia Casa", desc: "Barbara", cat: "extra" },
      { id: "montagna", name: "Montagna", desc: "Romeno, etc.", cat: "extra" },
      { id: "mare", name: "Mare", desc: "", cat: "extra" },
      { id: "viaggi", name: "Viaggi", desc: "Roma, Torino, Ponti, Weekend, Estero + Parigi-Disneyland (fine Maggio)", cat: "extra" },
      { id: "bettona", name: "Bettona & Caramellina", desc: "Spese veterinarie, sitting", cat: "extra" },
      { id: "regali", name: "Regali", desc: "Natale, Compleanni, Onomastici", cat: "extra" },
      { id: "vestiti_ed", name: "Vestiti Elena & Davide", desc: "", cat: "extra" },
      { id: "sfizi_famiglia", name: "Sfizi Famiglia", desc: "Per casa, lavori, etc.", cat: "extra" },
      { id: "mangiare_fuori", name: "Mangiare Fuori", desc: "", cat: "extra" },
      { id: "attivita_puzzetti", name: "Attività Puzzetti", desc: "Centro estivo, Nuoto Davide, Inglese", cat: "extra" },
      { id: "matrimonio", name: "Matrimonio", desc: "", cat: "extra" },
    ],
  },
  {
    id: "personale", label: "Personale", section: "PERSONALE", splitMode: "manual",
    color: "#6c3483", bg: "rgba(108,52,131,0.12)", borderColor: "rgba(108,52,131,0.35)", pill: "#8e44ad",
    items: [
      { id: "pensione", name: "Pensione", desc: "", cat: "saving" },
      { id: "onepassword", name: "1Password", desc: "€31,69 – Annuale – 14 Set", cat: "extra" },
      { id: "google_one", name: "Google One", desc: "€99,99 – Annuale – 25 Feb", cat: "extra" },
      { id: "dentista", name: "Dentista", desc: "Pulizia dei denti", cat: "essential" },
      { id: "ps_plus", name: "PS+", desc: "€125 – Annuale – 12 Mar", cat: "extra" },
      { id: "crossfit", name: "Crossfit / Pilates", desc: "", cat: "extra" },
      { id: "surfshark", name: "Surfshark", desc: "€50 – Annuale – 17 Feb – PayPal Diego", cat: "extra" },
      { id: "vestiti_sfizi", name: "Vestiti / Sfizi", desc: "", cat: "extra" },
      { id: "parrucchiere", name: "Parrucchiere / Estetista", desc: "", cat: "extra" },
      { id: "commercialista", name: "Commercialista", desc: "", cat: "essential" },
      { id: "telefonino", name: "Telefonino", desc: "", cat: "essential" },
    ],
  },
  {
    id: "risparmi", label: "Risparmi", section: "RISPARMI", splitMode: "manual",
    color: "#1e8449", bg: "rgba(30,132,73,0.10)", borderColor: "rgba(30,132,73,0.32)", pill: "#27ae60",
    items: [
      { id: "risparmi_diego", name: "Risparmi Diego", desc: "", cat: "saving" },
      { id: "risparmi_carmen", name: "Risparmi Carmen", desc: "", cat: "saving" },
    ],
  },
];

const SECTION_LABELS = {
  COMUNE:    { color: "#c0392b", label: "COMUNE",    tKey: "sectionComune" },
  PERSONALE: { color: "#6c3483", label: "PERSONALE", tKey: "sectionPersonale" },
  RISPARMI:  { color: "#1e8449", label: "RISPARMI",  tKey: "sectionRisparmi" },
};

const fmt = (n) => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n || 0);
const pct = (n) => (typeof n === "number" ? n.toFixed(1) + "%" : "0.0%");

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

export default function App() {
  const [tab, setTab] = useState("entrate");
  const [subTab, setSubTab] = useState("plan");
  const [lang, setLang] = useState("it");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [history, setHistory] = useState({});
  const [plan, setPlan] = useState({});
  const [structure, setStructure] = useState(PLAN_STRUCTURE);
  const [uscite, setUscite] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState({});
  const [expandedDesc, setExpandedDesc] = useState({});
  const [names, setNames] = useState({ p1: "", p2: "" });
  const [showSetup, setShowSetup] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState(null); // "ok" | "error"
  const [setupDraft, setSetupDraft] = useState({ p1: "", p2: "" });

  // New expense form
  const [newCat, setNewCat] = useState(CATEGORIE_BASE[0].id);
  const [newEsercente, setNewEsercente] = useState("");
  const [newDate, setNewDate] = useState(today());
  const [newAmount, setNewAmount] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [showForm, setShowForm] = useState(false);
  const [confirmCopy, setConfirmCopy] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [bollette, setBollette] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const [pelletLog, setPelletLog] = useState([]);
  const [pelletForm, setPelletForm] = useState({ date: today(), comprati: "", consumati: "" });
  const [editingPellet, setEditingPellet] = useState(null);

  const key = `${year}-${String(month + 1).padStart(2, "0")}`;

  useEffect(() => {
    async function load() {
      try { const h = await window.storage.get("bgt-history"); if (h) setHistory(JSON.parse(h.value)); } catch {}
      try { const p = await window.storage.get("bgt-plan"); if (p) setPlan(JSON.parse(p.value)); } catch {}
      try {
        const s = await window.storage.get("bgt-structure");
        if (s) {
          const stored = JSON.parse(s.value);
          // Merge day property from PLAN_STRUCTURE defaults into stored structure
          const merged = stored.map(group => {
            const defaultGroup = PLAN_STRUCTURE.find(g => g.id === group.id);
            if (!defaultGroup) return group;
            return {
              ...group,
              items: group.items.map(item => {
                const defaultItem = defaultGroup.items.find(i => i.id === item.id);
                return defaultItem ? { ...item, day: defaultItem.day, cat: item.cat || defaultItem.cat } : item;
              })
            };
          });
          setStructure(merged);
        }
      } catch {}
      try { const n = await window.storage.get("bgt-names"); if (n) setNames(JSON.parse(n.value)); } catch {}
      try { const l = await window.storage.get("bgt-lang"); if (l) setLang(l.value); } catch {}
      try { const u = await window.storage.get("bgt-uscite"); if (u) setUscite(JSON.parse(u.value)); } catch {}
      try { const b = await window.storage.get("bgt-bollette"); if (b) setBollette(JSON.parse(b.value)); } catch {}
      try { const p = await window.storage.get("bgt-pellet"); if (p) setPelletLog(JSON.parse(p.value)); } catch {}
      setLoaded(true);
    }
    load();
  }, []);

  const saveHistory = async (v) => { setHistory(v); await window.storage.set("bgt-history", JSON.stringify(v)); };
  const saveNames = async (v) => { setNames(v); await window.storage.set("bgt-names", JSON.stringify(v)); };
  const saveLang = async (l) => { setLang(l); await window.storage.set("bgt-lang", l); };
  const tr = TRANSLATIONS[lang] || TRANSLATIONS.it;
  const t = (key) => tr[key] || TRANSLATIONS.it[key] || key;
  const MONTHS = tr.months;
  const CATEGORIE = CATEGORIE_BASE.map(c => ({ ...c, label: t(c.tKey) }));

  const exportData = () => {
    const data = { names, history, plan, uscite, bollette, pelletLog };
    return JSON.stringify(data, null, 2);
  };

  const importData = async (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.names)     { setNames(data.names);         await window.storage.set("bgt-names",      JSON.stringify(data.names)); }
      if (data.history)   { setHistory(data.history);     await window.storage.set("bgt-history",    JSON.stringify(data.history)); }
      if (data.plan)      { setPlan(data.plan);           await window.storage.set("bgt-plan",       JSON.stringify(data.plan)); }
      if (data.uscite)    { setUscite(data.uscite);       await window.storage.set("bgt-uscite",     JSON.stringify(data.uscite)); }
      if (data.bollette)  { setBollette(data.bollette);   await window.storage.set("bgt-bollette",   JSON.stringify(data.bollette)); }
      if (data.pelletLog) { setPelletLog(data.pelletLog); await window.storage.set("bgt-pellet",     JSON.stringify(data.pelletLog)); }
      setImportStatus("ok");
      setTimeout(() => { setImportStatus(null); setImportText(""); setShowExportImport(false); }, 2000);
    } catch {
      setImportStatus("error");
    }
  };
  const savePlan = async (v) => { setPlan(v); await window.storage.set("bgt-plan", JSON.stringify(v)); };
  const saveStructure = async (v) => { setStructure(v); await window.storage.set("bgt-structure", JSON.stringify(v)); };
  const saveUscite = async (v) => { setUscite(v); await window.storage.set("bgt-uscite", JSON.stringify(v)); };
  const saveBollette = async (v) => { setBollette(v); await window.storage.set("bgt-bollette", JSON.stringify(v)); };
  const savePelletLog = async (v) => { setPelletLog(v); await window.storage.set("bgt-pellet", JSON.stringify(v)); };

  const N1 = names.p1 || "Persona 1";
  const N2 = names.p2 || "Persona 2";
  const hasNames = names.p1 && names.p2;

  const current = history[key] || { diego: "", carmen: "" };
  const diegoVal = parseFloat(current.diego) || 0;
  const carmenVal = parseFloat(current.carmen) || 0;
  const total = diegoVal + carmenVal;
  const diegoPct = total > 0 ? (diegoVal / total) * 100 : 50;
  const carmenPct = total > 0 ? (carmenVal / total) * 100 : 50;

  const updateSalary = (person, value) => saveHistory({ ...history, [key]: { ...current, [person]: value } });

  const currentPlan = plan[key] || {};
  const updateAutoItem = (itemId, value) => savePlan({ ...plan, [key]: { ...currentPlan, [itemId]: value } });
  const updateManualItem = (itemId, person, value) => {
    const existing = currentPlan[itemId] || {};
    savePlan({ ...plan, [key]: { ...currentPlan, [itemId]: { ...existing, [person]: value } } });
  };

  const toggleCollapse = (id) => setCollapsed(c => ({ ...c, [id]: !c[id] }));
  const toggleDesc = (id) => setExpandedDesc(c => ({ ...c, [id]: !c[id] }));

  // USCITE helpers
  const monthUscite = uscite.filter(u => {
    const d = new Date(u.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  // Scheduled items from Plan (revolut_cointestato with day) as virtual uscite
  const scheduledUscite = (() => {
    const revGroup = structure.find(g => g.id === "revolut_cointestato");
    if (!revGroup) return [];
    return revGroup.items
      .filter(item => item.day && parseFloat(currentPlan[item.id]) > 0)
      .map(item => ({
        id: `sched_${item.id}`,
        categoria: "programmati",
        esercente: item.name,
        date: `${year}-${String(month + 1).padStart(2,"0")}-${String(item.day).padStart(2,"0")}`,
        amount: parseFloat(currentPlan[item.id]) || 0,
        isScheduled: true,
      }));
  })();

  const allMonthUscite = [...monthUscite, ...scheduledUscite];

  const addUscita = () => {
    if (!newAmount || !newDate) return;
    if (editingId) {
      // Edit mode
      const newU = uscite.map(u => u.id === editingId
        ? { ...u, categoria: newCat, esercente: newEsercente.trim(), date: newDate, amount: parseFloat(newAmount) }
        : u
      );
      saveUscite(newU);
      setEditingId(null);
    } else {
      const entry = {
        id: Date.now(),
        categoria: newCat,
        esercente: newEsercente.trim(),
        date: newDate,
        amount: parseFloat(newAmount),
      };
      saveUscite([entry, ...uscite]);
    }
    setNewEsercente("");
    setNewAmount("");
    setNewDate(today());
    setNewCat(CATEGORIE[0].id);
    setShowForm(false);
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setNewCat(u.categoria);
    setNewEsercente(u.esercente || "");
    setNewDate(u.date);
    setNewAmount(String(u.amount));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteUscita = (id) => saveUscite(uscite.filter(u => u.id !== id));

  const filteredUscite = allMonthUscite
    .filter(u => filterCat === "all" || u.categoria === filterCat)
    .sort((a, b) => {
      if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount_desc") return b.amount - a.amount;
      if (sortBy === "cat") return a.categoria.localeCompare(b.categoria);
      return 0;
    });

  const totalMonthUscite = allMonthUscite.reduce((a, u) => a + u.amount, 0);

  // Totals by category
  const catTotals = CATEGORIE.map(c => ({
    ...c,
    total: allMonthUscite.filter(u => u.categoria === c.id).reduce((a, u) => a + u.amount, 0)
  })).filter(c => c.total > 0);

  const getCat = (id) => CATEGORIE.find(c => c.id === id) || CATEGORIE[CATEGORIE.length - 1];

  // Plan totals
  const getGroupTotal = (group) => {
    return group.items.reduce((acc, item) => {
      if (group.splitMode === "auto") return acc + (parseFloat(currentPlan[item.id]) || 0);
      const v = currentPlan[item.id] || {};
      return acc + (parseFloat(v.diego) || 0) + (parseFloat(v.carmen) || 0);
    }, 0);
  };

  const getPlanTotals = () => {
    let comuneTotal = 0, personaleTotal = 0, rispTotal = 0, dTotal = 0, cTotal = 0;
    structure.forEach(group => {
      const gt = getGroupTotal(group);
      if (group.section === "COMUNE") comuneTotal += gt;
      else if (group.section === "PERSONALE") personaleTotal += gt;
      else rispTotal += gt;
      group.items.forEach(item => {
        if (group.splitMode === "auto") {
          const amt = parseFloat(currentPlan[item.id]) || 0;
          dTotal += amt * (diegoPct / 100);
          cTotal += amt * (carmenPct / 100);
        } else {
          const v = currentPlan[item.id] || {};
          dTotal += parseFloat(v.diego) || 0;
          cTotal += parseFloat(v.carmen) || 0;
        }
      });
    });
    return { comuneTotal, personaleTotal, rispTotal, grandTotal: comuneTotal + personaleTotal + rispTotal, dTotal, cTotal };
  };

  const addItem = (groupId) => {
    const name = prompt("Nome voce:");
    if (!name) return;
    const id = "custom_" + Date.now();
    saveStructure(structure.map(g => g.id === groupId ? { ...g, items: [...g.items, { id, name, desc: "" }] } : g));
  };

  const removeItem = (groupId, itemId) =>
    saveStructure(structure.map(g => g.id === groupId ? { ...g, items: g.items.filter(i => i.id !== itemId) } : g));

  const historyEntries = Object.entries(history)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([k, v]) => {
      const [y, m] = k.split("-");
      const d = parseFloat(v.diego) || 0; const c = parseFloat(v.carmen) || 0; const tot = d + c;
      return { key: k, year: y, month: MONTHS[parseInt(m) - 1], diego: d, carmen: c, total: tot, dPct: tot > 0 ? (d/tot)*100 : 50, cPct: tot > 0 ? (c/tot)*100 : 50 };
    });

  const planTotals = getPlanTotals();
  const sections = ["COMUNE", "PERSONALE", "RISPARMI"];

  if (!loaded) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#0d0d0f", color:"#fff", fontFamily:"sans-serif" }}>{lang ? "Loading..." : "Caricamento..."}</div>
  );

  // Onboarding / Settings screen
  if (!hasNames || showSetup) return (
    <div style={{ minHeight:"100vh", background:"#0d0d0f", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#f0ede8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } input[type=text],select { background:#181820; border:1px solid #252530; color:#f0ede8; border-radius:10px; padding:14px 16px; font-size:15px; width:100%; outline:none; font-family:inherit; transition:border-color 0.2s; } input[type=text]:focus { border-color:#e8c547; } button { cursor:pointer; border:none; font-family:inherit; }`}</style>
      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#e8c547", marginBottom:8, textAlign:"center" }}>{showSetup ? t("settingsTitle") : t("appSubtitle")}</div>
      <div style={{ fontSize:13, color:"#555", marginBottom:32, textAlign:"center" }}>{showSetup ? `${N1} & ${N2}` : t("settingsOnboardingTitle")}</div>

      <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:16 }}>
        {/* Language selector */}
        <div>
          <div style={{ fontSize:11, color:"#e8c547", fontWeight:700, letterSpacing:1, marginBottom:8 }}>{t("settingsLang").toUpperCase()}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {LANG_OPTIONS.map(l => (
              <button key={l.code} onClick={() => saveLang(l.code)} style={{ padding:"8px 14px", borderRadius:20, fontSize:13, fontWeight:700, background: lang===l.code ? "#e8c547" : "#181820", color: lang===l.code ? "#0d0d0f" : "#555", border:`1.5px solid ${lang===l.code ? "#e8c547" : "#252530"}`, transition:"all 0.15s" }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height:1, background:"#1f1f28" }} />

        <div>
          <div style={{ fontSize:11, color:"#4a9eff", fontWeight:700, letterSpacing:1, marginBottom:8 }}>{t("settingsPerson1").toUpperCase()}</div>
          <input type="text" placeholder="es. Marco" value={setupDraft.p1 || names.p1} onChange={e => setSetupDraft(d => ({...d, p1: e.target.value}))} />
        </div>
        <div>
          <div style={{ fontSize:11, color:"#ff6b9d", fontWeight:700, letterSpacing:1, marginBottom:8 }}>{t("settingsPerson2").toUpperCase()}</div>
          <input type="text" placeholder="es. Sara" value={setupDraft.p2 || names.p2} onChange={e => setSetupDraft(d => ({...d, p2: e.target.value}))} />
        </div>

        <button
          onClick={() => {
            const n = { p1: setupDraft.p1 || names.p1, p2: setupDraft.p2 || names.p2 };
            if (!n.p1 || !n.p2) return;
            saveNames(n);
            setSetupDraft({ p1:"", p2:"" });
            setShowSetup(false);
          }}
          style={{ background:"#e8c547", color:"#0d0d0f", borderRadius:12, padding:"14px", fontSize:15, fontWeight:700, marginTop:8 }}
        >
          {showSetup ? t("settingsSave") : t("settingsStart")}
        </button>
        {showSetup && (
          <button onClick={() => { setShowSetup(false); setSetupDraft({p1:"",p2:""}); }} style={{ background:"transparent", color:"#555", padding:"10px", fontSize:13 }}>
            {t("settingsCancel")}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#0d0d0f", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#f0ede8" }}>

      {/* Export/Import Modal */}
      {showExportImport && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:"#141418", border:"1px solid #2a2a35", borderRadius:18, padding:24, width:"100%", maxWidth:480 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#e8c547" }}>💾 {t("exportImportTitle")}</div>
              <button onClick={() => { setShowExportImport(false); setImportText(""); setImportStatus(null); }} style={{ color:"#555", fontSize:22 }}>×</button>
            </div>

            {/* EXPORT */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#666", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>📤 {t("exportTitle")}</div>
              <div style={{ fontSize:12, color:"#555", marginBottom:10 }}>{t("exportDesc")}</div>
              <textarea
                readOnly
                value={exportData()}
                style={{ width:"100%", height:120, background:"#0f0f13", border:"1px solid #252530", borderRadius:10, padding:"10px 12px", color:"#888", fontSize:11, fontFamily:"monospace", resize:"none", outline:"none" }}
                onClick={e => e.target.select()}
              />
              <button
                onClick={() => {
                  const el = document.createElement("textarea");
                  el.value = exportData();
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand("copy");
                  document.body.removeChild(el);
                }}
                style={{ width:"100%", marginTop:8, background:"#252530", color:"#e8c547", borderRadius:10, padding:"11px", fontSize:13, fontWeight:600 }}
              >
                {t("exportCopy")}
              </button>
            </div>

            <div style={{ height:1, background:"#1f1f28", marginBottom:20 }} />

            {/* IMPORT */}
            <div>
              <div style={{ fontSize:11, color:"#666", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>📥 {t("importTitle")}</div>
              <div style={{ fontSize:12, color:"#555", marginBottom:10 }}>{t("importDesc")} <span style={{ color:"#e74c3c" }}>{t("importWarning")}</span></div>
              <textarea
                value={importText}
                onChange={e => { setImportText(e.target.value); setImportStatus(null); }}
                placeholder={t("importDesc")}
                style={{ width:"100%", height:100, background:"#0f0f13", border:`1px solid ${importStatus === "error" ? "#e74c3c" : importStatus === "ok" ? "#27ae60" : "#252530"}`, borderRadius:10, padding:"10px 12px", color:"#ccc", fontSize:11, fontFamily:"monospace", resize:"none", outline:"none" }}
              />
              {importStatus === "ok" && <div style={{ fontSize:12, color:"#27ae60", marginTop:6 }}>{t("importOk")}</div>}
              {importStatus === "error" && <div style={{ fontSize:12, color:"#e74c3c", marginTop:6 }}>{t("importErr")}</div>}
              <button
                onClick={() => importData(importText)}
                disabled={!importText.trim()}
                style={{ width:"100%", marginTop:10, background: importText.trim() ? "#e8c547" : "#1f1f28", color: importText.trim() ? "#0d0d0f" : "#444", borderRadius:10, padding:"11px", fontSize:13, fontWeight:700 }}
              >
                {t("importBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#1a1a1f; } ::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }
        input[type=number],input[type=text],input[type=date],textarea { background:#181820; border:1px solid #252530; color:#f0ede8; border-radius:8px; padding:10px 14px; font-size:14px; width:100%; outline:none; font-family:inherit; transition:border-color 0.2s; -moz-appearance:textfield; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        input[type=date]::-webkit-calendar-picker-indicator { filter:invert(0.4); }
        input:focus { border-color:#e8c547; }
        input::placeholder { color:#444; }
        select { font-family:inherit; cursor:pointer; background:#181820; border:1px solid #252530; color:#f0ede8; border-radius:8px; padding:9px 12px; font-size:13px; width:100%; outline:none; }
        button { cursor:pointer; border:none; font-family:inherit; background:none; }
        .tag { display:inline-flex; align-items:center; font-size:10px; font-weight:700; padding:2px 9px; border-radius:20px; letter-spacing:0.8px; text-transform:uppercase; color:#fff; white-space:nowrap; }
      `}</style>

      {/* Sticky Header */}
      <div style={{ padding:"16px 16px 0", borderBottom:"1px solid #1a1a22", position:"sticky", top:0, background:"#0d0d0f", zIndex:20 }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:19, color:"#e8c547" }}>{t("appSubtitle")}</div>
              <div style={{ fontSize:10, color:"#444", letterSpacing:1.2, textTransform:"uppercase" }}>{N1} & {N2}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button onClick={() => { setSetupDraft({p1:names.p1, p2:names.p2}); setShowSetup(true); }} style={{ background:"none", color:"#444", fontSize:18, padding:"4px 6px", borderRadius:8 }}>⚙️</button>
              <button onClick={() => setShowExportImport(true)} style={{ background:"none", color:"#444", fontSize:18, padding:"4px 6px", borderRadius:8 }}>💾</button>
              <div style={{ display:"flex", gap:6 }}>
              <select value={month} onChange={e => setMonth(parseInt(e.target.value))} style={{ padding:"6px 10px", fontSize:12, width:"auto" }}>
                {MONTHS.map((m,i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select value={year} onChange={e => setYear(parseInt(e.target.value))} style={{ padding:"6px 10px", fontSize:12, width:76 }}>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            </div>
          </div>
          {/* Main tabs */}
          <div style={{ display:"flex", borderBottom:"1px solid #1a1a22" }}>
            {[["entrate","💰","tabEntrate"],["budget","📋","tabBudget"],["spese","💸","tabSpese"],["casa","🏠","tabCasa"]].map(([t_,icon,tkey]) => (
              <button key={t_} onClick={() => setTab(t_)} style={{ flex:1, padding:"9px 0", fontSize:11, fontWeight:tab===t_?700:400, color:tab===t_?"#e8c547":"#555", borderBottom:tab===t_?"2px solid #e8c547":"2px solid transparent", transition:"all 0.2s" }}>
                {icon}<br/><span style={{ fontSize:10 }}>{t(tkey)}</span>
              </button>
            ))}
          </div>
          {/* Sub-tabs */}
          {tab === "budget" && (
            <div style={{ display:"flex", background:"#0a0a0d", borderBottom:"1px solid #111" }}>
              {[["plan","subPlan"],["daily","subDaily"],["overview","subOverview"]].map(([s,k]) => (
                <button key={s} onClick={() => setSubTab(s)} style={{ flex:1, padding:"7px 0", fontSize:11, color:subTab===s?"#e8c547":"#444", borderBottom:subTab===s?"2px solid #e8c54766":"2px solid transparent" }}>{t(k)}</button>
              ))}
            </div>
          )}
          {tab === "spese" && (
            <div style={{ display:"flex", background:"#0a0a0d", borderBottom:"1px solid #111" }}>
              {[["uscite","subUscite"],["storico","subStorico"]].map(([s,k]) => (
                <button key={s} onClick={() => setSubTab(s)} style={{ flex:1, padding:"7px 0", fontSize:11, color:subTab===s?"#e8c547":"#444", borderBottom:subTab===s?"2px solid #e8c54766":"2px solid transparent" }}>{t(k)}</button>
              ))}
            </div>
          )}
          {tab === "casa" && (
            <div style={{ display:"flex", background:"#0a0a0d", borderBottom:"1px solid #111" }}>
              {[["bollette","subBollette"],["grafici","subGrafici"],["pellet","subPellet"]].map(([s,k]) => (
                <button key={s} onClick={() => setSubTab(s)} style={{ flex:1, padding:"7px 0", fontSize:11, color:subTab===s?"#e8c547":"#444", borderBottom:subTab===s?"2px solid #e8c54766":"2px solid transparent" }}>{t(k)}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"20px 16px 70px" }}>

        {/* ====== ENTRATE ====== */}
        {tab === "entrate" && (
          <div>
            <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:16 }}>{MONTHS[month]} {year}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
              {[
                { k:"diego", label:N1, color:"#4a9eff", bg:"rgba(74,158,255,0.07)", border:"rgba(74,158,255,0.2)" },
                { k:"carmen", label:N2, color:"#ff6b9d", bg:"rgba(255,107,157,0.07)", border:"rgba(255,107,157,0.2)" }
              ].map(({ k, label, color, bg, border }) => {
                const val = k === "diego" ? diegoVal : carmenVal;
                const p = k === "diego" ? diegoPct : carmenPct;
                return (
                  <div key={k} style={{ background:bg, border:`1px solid ${border}`, borderRadius:14, padding:18 }}>
                    <div style={{ fontSize:11, color, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", marginBottom:10 }}>{label}</div>
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:14 }}>€</span>
                      <input type="number" placeholder="0,00" value={current[k]||""} onChange={e => updateSalary(k, e.target.value)} style={{ paddingLeft:30 }} />
                    </div>
                    {val > 0 && (
                      <div style={{ marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:12, color:"#555" }}>{t("contribution")}</span>
                        <span style={{ fontSize:24, fontFamily:"'DM Serif Display',serif", color }}>{pct(p)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {total > 0 && (
              <div style={{ background:"#141418", border:"1px solid #222", borderRadius:14, padding:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ fontSize:12, color:"#555" }}>{t("familyTotal")}</span>
                  <span style={{ fontSize:22, fontFamily:"'DM Serif Display',serif", color:"#e8c547" }}>{fmt(total)}</span>
                </div>
                <div style={{ height:8, borderRadius:4, overflow:"hidden", display:"flex", marginBottom:8 }}>
                  <div style={{ width:`${diegoPct}%`, background:"#4a9eff", transition:"width 0.6s ease" }} />
                  <div style={{ width:`${carmenPct}%`, background:"#ff6b9d", transition:"width 0.6s ease" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:12, color:"#4a9eff" }}>● {N1} {fmt(diegoVal)} ({diegoPct.toFixed(1)}%)</span>
                  <span style={{ fontSize:12, color:"#ff6b9d" }}>{N2} {fmt(carmenVal)} ({carmenPct.toFixed(1)}%) ●</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====== PLAN ====== */}
        {(tab === "budget" && subTab === "plan") && (
          <div>
            {total === 0 && (
              <div style={{ background:"rgba(232,197,71,0.07)", border:"1px solid rgba(232,197,71,0.2)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#e8c547", marginBottom:16 }}>
                ⚠️ Inserisci gli stipendi in Entrate per il calcolo automatico
              </div>
            )}

            {/* Copy from previous month */}
            {(() => {
              const prevMonth = month === 0 ? 11 : month - 1;
              const prevYear = month === 0 ? year - 1 : year;
              const prevKey = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}`;
              const prevPlan = plan[prevKey];
              const currentEmpty = !plan[key] || Object.keys(plan[key]).length === 0;
              const hasPrev = prevPlan && Object.keys(prevPlan).length > 0;
              if (!hasPrev) return null;

              if (!currentEmpty && !confirmCopy) {
                return (
                  <button onClick={() => setConfirmCopy(true)} style={{
                    width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    background:"rgba(255,255,255,0.03)", border:"1px dashed #2a2a35",
                    borderRadius:10, padding:"11px 16px", marginBottom:16,
                    color:"#555", fontSize:13, fontWeight:500
                  }}>
                    <span style={{ fontSize:15 }}>⎘</span>
                    Copia Plan da {MONTHS[prevMonth]} {prevYear}
                    <span style={{ fontSize:10, color:"#3a3a44" }}>(sovrascrive)</span>
                  </button>
                );
              }

              if (!currentEmpty && confirmCopy) {
                return (
                  <div style={{ background:"rgba(232,197,71,0.08)", border:"1px solid rgba(232,197,71,0.3)", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                    <div style={{ fontSize:13, color:"#e8c547", marginBottom:10 }}>
                      ⚠️ Sovrascrivere {MONTHS[month]} {year} con i valori di {MONTHS[prevMonth]} {prevYear}?
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => { savePlan({ ...plan, [key]: { ...prevPlan } }); setConfirmCopy(false); }} style={{ flex:1, background:"#e8c547", color:"#0d0d0f", borderRadius:8, padding:"9px", fontSize:13, fontWeight:700 }}>
                        Sì, copia
                      </button>
                      <button onClick={() => setConfirmCopy(false)} style={{ flex:1, background:"#1f1f28", color:"#888", borderRadius:8, padding:"9px", fontSize:13 }}>
                        Annulla
                      </button>
                    </div>
                  </div>
                );
              }

              // Current month is empty → copy directly
              return (
                <button onClick={() => savePlan({ ...plan, [key]: { ...prevPlan } })} style={{
                  width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  background:"rgba(232,197,71,0.1)", border:"1px dashed rgba(232,197,71,0.4)",
                  borderRadius:10, padding:"11px 16px", marginBottom:16,
                  color:"#e8c547", fontSize:13, fontWeight:600
                }}>
                  <span style={{ fontSize:15 }}>⎘</span>
                  Copia Plan da {MONTHS[prevMonth]} {prevYear}
                </button>
              );
            })()}
            {sections.map(sectionName => {
              const sectionGroups = structure.filter(g => g.section === sectionName);
              if (!sectionGroups.length) return null;
              const sectionInfo = SECTION_LABELS[sectionName];
              const sectionTotal = sectionGroups.reduce((acc, g) => acc + getGroupTotal(g), 0);
              const isSecCollapsed = collapsed[`sec_${sectionName}`];
              return (
                <div key={sectionName} style={{ marginBottom:18 }}>
                  <button onClick={() => toggleCollapse(`sec_${sectionName}`)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", background:`${sectionInfo.color}18`, border:`1.5px solid ${sectionInfo.color}44`, borderRadius: isSecCollapsed ? 12 : "12px 12px 0 0", padding:"11px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:4, height:20, borderRadius:2, background:sectionInfo.color }} />
                      <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:sectionInfo.color }}>{t(sectionInfo.tKey)}</span>
                      <span style={{ fontSize:10, color:"#444", fontStyle:"italic" }}>{sectionName === "COMUNE" ? t("autoSplit") : t("manualSplit")}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      {sectionTotal > 0 && <span style={{ fontSize:14, fontFamily:"'DM Serif Display',serif", color:"#e8c547" }}>{fmt(sectionTotal)}</span>}
                      <span style={{ color:"#444", fontSize:11 }}>{isSecCollapsed ? "▶" : "▼"}</span>
                    </div>
                  </button>
                  {!isSecCollapsed && (
                    <div style={{ border:`1.5px solid ${sectionInfo.color}44`, borderTop:"none", borderRadius:"0 0 12px 12px", overflow:"hidden" }}>
                      {sectionGroups.map((group, gi) => {
                        const groupTotal = getGroupTotal(group);
                        const isGroupCollapsed = collapsed[group.id];
                        return (
                          <div key={group.id} style={{ borderTop: gi > 0 ? "1px solid #1c1c24" : "none" }}>
                            <button onClick={() => toggleCollapse(group.id)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", background:group.bg, padding:"9px 16px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <span className="tag" style={{ background:group.pill }}>{group.label}</span>
                                {groupTotal > 0 && <span style={{ fontSize:12, color:"#888" }}>{fmt(groupTotal)}</span>}
                              </div>
                              <span style={{ color:"#444", fontSize:11 }}>{isGroupCollapsed ? "▶" : "▼"}</span>
                            </button>
                            {!isGroupCollapsed && (
                              <div style={{ background:"#0f0f13" }}>
                                {group.items.map((item, idx) => {
                                  const isManual = group.splitMode === "manual";
                                  const autoAmt = parseFloat(currentPlan[item.id]) || 0;
                                  const manualVal = currentPlan[item.id] || {};
                                  const roundFn = group.id === "vaults" ? Math.ceil : (x) => Math.round(x * 100) / 100;
                                  const dAmt = isManual ? (parseFloat(manualVal.diego)||0) : roundFn(autoAmt*(diegoPct/100));
                                  const cAmt = isManual ? (parseFloat(manualVal.carmen)||0) : roundFn(autoAmt*(carmenPct/100));
                                  const rowTotal = isManual ? dAmt+cAmt : autoAmt;
                                  const hasDesc = !!item.desc;
                                  const isDescOpen = expandedDesc[item.id];
                                  return (
                                    <div key={item.id} style={{ borderTop:"1px solid #181820", padding:"11px 16px" }}>
                                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                                        <div style={{ width:5, height:5, borderRadius:"50%", background:group.pill, flexShrink:0 }} />
                                        <span style={{ flex:1, fontSize:13, color:"#d0ccc7", fontWeight:500 }}>{item.name}</span>
                                        {item.day && <span style={{ fontSize:10, color:"#e8c547", background:"rgba(232,197,71,0.1)", border:"1px solid rgba(232,197,71,0.25)", borderRadius:5, padding:"1px 6px", flexShrink:0 }}>{t("dayLabel")} {item.day}</span>}
                                        {hasDesc && <button onClick={() => toggleDesc(item.id)} style={{ fontSize:10, color:"#444", padding:"1px 6px", border:"1px solid #2a2a35", borderRadius:4 }}>{isDescOpen ? "▲" : "ℹ"}</button>}
                                        <button onClick={() => removeItem(group.id, item.id)} style={{ color:"#2a2a35", fontSize:16, padding:"0 2px" }}>×</button>
                                      </div>
                                      {hasDesc && isDescOpen && (
                                        <div style={{ background:"#141418", borderRadius:7, padding:"7px 10px", fontSize:11, color:"#666", marginBottom:8, lineHeight:1.6 }}>{item.desc}</div>
                                      )}
                                      {!isManual ? (
                                        <div style={{ position:"relative", marginBottom: autoAmt > 0 ? 8 : 0 }}>
                                          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:13 }}>€</span>
                                          <input type="number" placeholder="0,00" value={currentPlan[item.id]||""} onChange={e => updateAutoItem(item.id, e.target.value)} style={{ paddingLeft:27, padding:"8px 12px 8px 27px" }} />
                                        </div>
                                      ) : (
                                        <div style={{ display:"flex", gap:8, marginBottom: rowTotal > 0 ? 8 : 0 }}>
                                          {["diego","carmen"].map(p => (
                                            <div key={p} style={{ flex:1 }}>
                                              <div style={{ fontSize:9, color: p==="diego"?"#4a9eff":"#ff6b9d", fontWeight:700, letterSpacing:0.8, marginBottom:4 }}>{p==="diego"?N1:N2}</div>
                                              <div style={{ position:"relative" }}>
                                                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12 }}>€</span>
                                                <input type="number" placeholder="0" value={manualVal[p]||""} onChange={e => updateManualItem(item.id, p, e.target.value)} style={{ paddingLeft:24, padding:"8px 10px 8px 24px", fontSize:13 }} />
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {!isManual && autoAmt > 0 && total > 0 && (
                                        <div style={{ display:"flex", gap:6 }}>
                                          {[["diego","#4a9eff",dAmt],["carmen","#ff6b9d",cAmt]].map(([p,c,a]) => (
                                            <div key={p} style={{ flex:1, background:`${c}0d`, border:`1px solid ${c}1a`, borderRadius:7, padding:"5px 10px" }}>
                                              <div style={{ fontSize:9, color:c, fontWeight:700, marginBottom:1 }}>{p==="diego"?N1:N2}</div>
                                              <div style={{ fontSize:13 }}>{fmt(a)}</div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {isManual && rowTotal > 0 && <div style={{ fontSize:11, color:"#555", textAlign:"right" }}>Totale: {fmt(rowTotal)}</div>}
                                    </div>
                                  );
                                })}
                                <button onClick={() => addItem(group.id)} style={{ width:"100%", padding:"9px 16px", borderTop:"1px dashed #1c1c24", color:"#3a3a44", fontSize:12, textAlign:"left" }}>+ Aggiungi voce</button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {planTotals.grandTotal > 0 && (
              <div style={{ background:"#131317", border:"1px solid #222", borderRadius:14, padding:18 }}>
                <div style={{ fontSize:10, color:"#444", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14 }}>{t("planSummary")} {MONTHS[month]} {year}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <span style={{ color:"#666", fontSize:13 }}>{t("grandTotal")}</span>
                  <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#e8c547" }}>{fmt(planTotals.grandTotal)}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:14 }}>
                  {[[t("sectionComune"),planTotals.comuneTotal,"#c0392b"],[t("sectionPersonale"),planTotals.personaleTotal,"#8e44ad"],[t("sectionRisparmi"),planTotals.rispTotal,"#27ae60"]].filter(r=>r[1]>0).map(([l,v,c])=>(
                    <div key={l} style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:12, color:c }}>● {l}</span>
                      <span style={{ fontSize:12, color:"#888" }}>{fmt(v)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height:1, background:"#1f1f28", marginBottom:14 }} />
                <div style={{ display:"flex", gap:10 }}>
                  {[[N1,diegoPct,planTotals.dTotal,"#4a9eff"],[N2,carmenPct,planTotals.cTotal,"#ff6b9d"]].map(([l,p,v,c])=>(
                    <div key={l} style={{ flex:1, background:`${c}12`, border:`1px solid ${c}22`, borderRadius:10, padding:"12px 14px" }}>
                      <div style={{ fontSize:9, color:c, fontWeight:700, letterSpacing:1, marginBottom:4 }}>{l} ({p.toFixed(1)}%)</div>
                      <div style={{ fontSize:19, fontWeight:600 }}>{fmt(v)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====== USCITE ====== */}
        {(tab === "spese" && subTab === "uscite") && (
          <div>
            {/* Header stats */}
            <div style={{ display:"flex", gap:10, marginBottom:16 }}>
              <div style={{ flex:1, background:"#141418", border:"1px solid #222", borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Totale {MONTHS[month]}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#e8c547" }}>{fmt(totalMonthUscite)}</div>
                <div style={{ fontSize:11, color:"#444", marginTop:2 }}>{allMonthUscite.length} {t("numExpenses")}</div>
              </div>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
                {catTotals.slice(0,3).map(c => (
                  <div key={c.id} style={{ background:c.bg, borderRadius:8, padding:"6px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:10, color:c.color, fontWeight:700 }}>{c.label}</span>
                    <span style={{ fontSize:12, color:"#ccc" }}>{fmt(c.total)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAB add button */}
            <button onClick={() => { setShowForm(!showForm); if (showForm) { setEditingId(null); setNewEsercente(""); setNewAmount(""); setNewDate(today()); setNewCat(CATEGORIE[0].id); } }} style={{ width:"100%", background: showForm ? "#1f1f28" : "#e8c547", color: showForm ? "#555" : "#0d0d0f", borderRadius:12, padding:"12px", fontSize:14, fontWeight:600, marginBottom:14, transition:"all 0.2s" }}>
              {showForm ? "✕ Annulla" : t("newExpense")}
            </button>

            {/* Add form */}
            {showForm && (
              <div style={{ background:"#141418", border:"1px solid #252530", borderRadius:14, padding:16, marginBottom:16 }}>
                <div style={{ fontSize:11, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>{editingId ? t("editExpense") : t("newExpense")}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {/* Categoria */}
                  <div>
                    <div style={{ fontSize:11, color:"#666", marginBottom:5 }}>{t("category")}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {CATEGORIE.map(c => (
                        <button key={c.id} onClick={() => setNewCat(c.id)} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:0.6, background: newCat===c.id ? c.color : "transparent", color: newCat===c.id ? "#fff" : c.color, border:`1.5px solid ${c.color}`, transition:"all 0.15s" }}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Esercente */}
                  <div>
                    <div style={{ fontSize:11, color:"#666", marginBottom:5 }}>{t("merchant")}</div>
                    <input type="text" placeholder={t("merchantPlaceholder")} value={newEsercente} onChange={e => setNewEsercente(e.target.value)} />
                  </div>
                  {/* Data + Importo */}
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:"#666", marginBottom:5 }}>{t("date")}</div>
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:"#666", marginBottom:5 }}>{t("amount")}</div>
                      <div style={{ position:"relative" }}>
                        <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#555" }}>€</span>
                        <input type="number" placeholder="0,00" value={newAmount} onChange={e => setNewAmount(e.target.value)} style={{ paddingLeft:28 }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={addUscita} style={{ background:"#e8c547", color:"#0d0d0f", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, marginTop:2 }}>
                    {editingId ? t("saveChanges") : t("saveExpense")}
                  </button>
                </div>
              </div>
            )}

            {/* Filters */}
            {allMonthUscite.length > 0 && (
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ flex:1, padding:"7px 10px", fontSize:12 }}>
                  <option value="all">{t("allCategories")}</option>
                  {CATEGORIE.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex:1, padding:"7px 10px", fontSize:12 }}>
                  <option value="date_desc">{t("sortDateDesc")}</option>
                  <option value="date_asc">{t("sortDateAsc")}</option>
                  <option value="amount_desc">{t("sortAmountDesc")}</option>
                  <option value="cat">{t("sortByCat")}</option>
                </select>
              </div>
            )}

            {/* Expense list */}
            {filteredUscite.length === 0 && (
              <div style={{ textAlign:"center", color:"#333", fontSize:13, padding:"40px 0" }}>
                {allMonthUscite.length === 0 ? t("noExpenses") : t("noFilter")}
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {filteredUscite.map(u => {
                const cat = getCat(u.categoria);
                const d = new Date(u.date);
                const dateStr = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
                return (
                  <div key={u.id} style={{ background: u.isScheduled ? "rgba(41,128,185,0.06)" : "#141418", borderRadius:11, padding:"12px 14px", display:"flex", alignItems:"center", gap:12, borderLeft:`3px solid ${cat.color}`, opacity: u.isScheduled ? 0.85 : 1 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                        <span className="tag" style={{ background:cat.color, fontSize:9 }}>{cat.label}</span>
                        <span style={{ fontSize:11, color:"#555" }}>{dateStr}</span>
                        {u.isScheduled && <span style={{ fontSize:9, color:"#2980b9", background:"rgba(41,128,185,0.15)", borderRadius:4, padding:"1px 5px", fontWeight:700 }}>AUTO</span>}
                      </div>
                      <div style={{ fontSize:14, color:"#ddd", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {u.esercente || <span style={{ color:"#444", fontStyle:"italic" }}>—</span>}
                      </div>
                    </div>
                    <div style={{ fontSize:16, fontFamily:"'DM Serif Display',serif", color:"#f0ede8", flexShrink:0 }}>{fmt(u.amount)}</div>
                    {!u.isScheduled && <button onClick={() => startEdit(u)} style={{ color:"#555", fontSize:14, padding:"0 3px", flexShrink:0 }}>✏️</button>}
                    {!u.isScheduled && <button onClick={() => deleteUscita(u.id)} style={{ color:"#2a2a35", fontSize:18, padding:"0 2px", flexShrink:0 }}>×</button>}
                    {u.isScheduled && <span style={{ fontSize:11, color:"#2a2a35", flexShrink:0 }}>🔒</span>}
                  </div>
                );
              })}
            </div>

            {/* Category breakdown at bottom */}
            {catTotals.length > 0 && (
              <div style={{ marginTop:20, background:"#131317", border:"1px solid #1f1f28", borderRadius:12, padding:16 }}>
                <div style={{ fontSize:10, color:"#444", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>{t("byCategory")}</div>
                {catTotals.map(c => (
                  <div key={c.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                    <span className="tag" style={{ background:c.color, minWidth:100 }}>{c.label}</span>
                    <div style={{ flex:1, height:4, borderRadius:2, background:"#1f1f28", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${(c.total/totalMonthUscite)*100}%`, background:c.color, borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:13, color:"#aaa", minWidth:70, textAlign:"right" }}>{fmt(c.total)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====== DAILY ====== */}
        {(tab === "budget" && subTab === "daily") && (() => {
          // Budget mensile = totale Revolut Cointestato dal Plan
          const revGroup = structure.find(g => g.id === "revolut_cointestato");
          const budgetMensile = revGroup
            ? revGroup.items.reduce((acc, item) => acc + (parseFloat(currentPlan[item.id]) || 0), 0)
            : 0;

          // Scheduled items (programmati dal Plan con giorno fisso)
          const scheduledPerGiorno = {};
          if (revGroup) {
            revGroup.items.forEach(item => {
              if (item.day && currentPlan[item.id]) {
                const amt = parseFloat(currentPlan[item.id]) || 0;
                if (amt > 0) {
                  if (!scheduledPerGiorno[item.day]) scheduledPerGiorno[item.day] = [];
                  scheduledPerGiorno[item.day].push({ name: item.name, amount: amt });
                }
              }
            });
          }

          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const todayDate = new Date();
          const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;
          const todayDay = isCurrentMonth ? todayDate.getDate() : daysInMonth;

          // Aggregate uscite by day (exclude programmati - already in plan)
          const spesaPerGiorno = {};
          monthUscite.filter(u => u.categoria !== "programmati").forEach(u => {
            const d = new Date(u.date).getDate();
            spesaPerGiorno[d] = (spesaPerGiorno[d] || 0) + u.amount;
          });

          // Build running totals
          let runningBudget = budgetMensile;
          const days = [];
          for (let d = 1; d <= daysInMonth; d++) {
            const speso = spesaPerGiorno[d] || 0;
            const scheduled = scheduledPerGiorno[d] || [];
            const scheduledTotal = scheduled.reduce((a, s) => a + s.amount, 0);
            const totalDay = speso + scheduledTotal;
            const giorniRimanenti = daysInMonth - d;
            runningBudget -= totalDay;
            const budgetGiornaliero = giorniRimanenti > 0 ? runningBudget / giorniRimanenti : runningBudget;
            const isPast = d < todayDay;
            const isToday = d === todayDay;
            const isFuture = d > todayDay;
            const date = new Date(year, month, d);
            const dowLabel = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"][date.getDay()];
            days.push({ d, speso, scheduled, scheduledTotal, totalDay, runningBudget, budgetGiornaliero, isPast, isToday, isFuture, dowLabel, giorniRimanenti });
          }

          const budgetGiornalieroIniziale = daysInMonth > 0 ? budgetMensile / daysInMonth : 0;
          const spesaTotaleFinora = monthUscite.reduce((a, u) => a + u.amount, 0);
          const rimanente = budgetMensile - spesaTotaleFinora;
          const giorniRimanentiOggi = daysInMonth - todayDay;
          const budgetGiornalieroOggi = giorniRimanentiOggi > 0 ? rimanente / giorniRimanentiOggi : rimanente;
          const isUnderBudget = rimanente >= 0;

          if (budgetMensile === 0) return (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>📋</div>
              <div style={{ color:"#555", fontSize:14 }}>{t("noPlanData")}</div>
            </div>
          );

          return (
            <div>
              {/* Header cards */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                <div style={{ background:"#141418", border:"1px solid #222", borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>{t("dailyBudget")}</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#e8c547" }}>{fmt(budgetMensile)}</div>
                  <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{t("revolut")}</div>
                </div>
                <div style={{ background: isUnderBudget ? "rgba(39,174,96,0.08)" : "rgba(231,76,60,0.08)", border:`1px solid ${isUnderBudget ? "rgba(39,174,96,0.2)" : "rgba(231,76,60,0.2)"}`, borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>{t("remaining")}</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color: isUnderBudget ? "#27ae60" : "#e74c3c" }}>{fmt(rimanente)}</div>
                  <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{t("spent")}: {fmt(spesaTotaleFinora)}</div>
                </div>
                <div style={{ background:"#141418", border:"1px solid #222", borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>{t("initialAvg")}</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#aaa" }}>{fmt(budgetGiornalieroIniziale)}</div>
                  <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{daysInMonth} {t("daysLeft").split(" ").pop()}</div>
                </div>
                <div style={{ background: budgetGiornalieroOggi >= budgetGiornalieroIniziale ? "rgba(39,174,96,0.08)" : "rgba(231,76,60,0.08)", border:`1px solid ${budgetGiornalieroOggi >= budgetGiornalieroIniziale ? "rgba(39,174,96,0.2)" : "rgba(231,76,60,0.2)"}`, borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>{t("updatedAvg")}</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color: budgetGiornalieroOggi >= budgetGiornalieroIniziale ? "#27ae60" : "#e74c3c" }}>{fmt(budgetGiornalieroOggi)}</div>
                  <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{giorniRimanentiOggi} {t("daysLeft")}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background:"#141418", border:"1px solid #222", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#555", marginBottom:8 }}>
                  <span>{t("budgetUse")}</span>
                  <span>{budgetMensile > 0 ? ((spesaTotaleFinora / budgetMensile) * 100).toFixed(1) : 0}%</span>
                </div>
                <div style={{ height:8, borderRadius:4, background:"#1f1f28", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.min((spesaTotaleFinora / budgetMensile) * 100, 100)}%`, background: isUnderBudget ? "#27ae60" : "#e74c3c", borderRadius:4, transition:"width 0.5s ease" }} />
                </div>
                {/* Today marker */}
                <div style={{ position:"relative", height:14 }}>
                  <div style={{ position:"absolute", left:`${((todayDay-1) / daysInMonth) * 100}%`, top:2, width:2, height:10, background:"#e8c547", borderRadius:1 }} />
                </div>
                <div style={{ fontSize:10, color:"#444", textAlign:"center" }}>▲ {t("todayMarker")} ({todayDay} {MONTHS[month]})</div>
              </div>

              {/* Daily list */}
              <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {days.map(({ d, speso, scheduled, scheduledTotal, totalDay, runningBudget, budgetGiornaliero, isPast, isToday, isFuture, dowLabel, giorniRimanenti }) => {
                  const isSunSat = new Date(year, month, d).getDay() === 0 || new Date(year, month, d).getDay() === 6;
                  const bgColor = isToday ? "rgba(232,197,71,0.08)" : isFuture ? "#0f0f12" : "#141418";
                  const borderColor = isToday ? "rgba(232,197,71,0.4)" : "transparent";
                  const overBudgetDay = isPast && speso > (budgetMensile / daysInMonth) * 1.5;

                  return (
                    <div key={d} style={{ background:bgColor, border:`1px solid ${borderColor}`, borderRadius:8, padding:"9px 12px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        {/* Day */}
                        <div style={{ width:38, flexShrink:0 }}>
                          <div style={{ fontSize:10, color: isSunSat ? "#e8c547" : "#555", textTransform:"uppercase" }}>{dowLabel}</div>
                          <div style={{ fontSize:15, fontWeight: isToday ? 700 : 400, color: isToday ? "#e8c547" : isFuture ? "#333" : "#ddd" }}>{d}</div>
                        </div>

                        {/* Speso + scheduled */}
                        <div style={{ flex:1, minWidth:0 }}>
                          {speso > 0 && (
                            <div style={{ fontSize:14, color:"#ddd", fontWeight:500 }}>{fmt(speso)}</div>
                          )}
                          {scheduled.length > 0 && scheduled.map((s, i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:5, marginTop: i === 0 && speso === 0 ? 0 : 3 }}>
                              <span style={{ fontSize:9, color:"#2980b9", background:"rgba(41,128,185,0.15)", borderRadius:4, padding:"1px 5px", fontWeight:700 }}>AUTO</span>
                              <span style={{ fontSize:11, color:"#666" }}>{s.name}</span>
                              <span style={{ fontSize:11, color:"#888", marginLeft:"auto" }}>{fmt(s.amount)}</span>
                            </div>
                          ))}
                          {speso === 0 && scheduled.length === 0 && (
                            <div style={{ fontSize:13, color: isFuture ? "#252530" : "#2a2a35" }}>—</div>
                          )}
                        </div>

                        {/* Budget giornaliero aggiornato */}
                        {!isFuture && giorniRimanenti > 0 && (
                          <div style={{ textAlign:"right", flexShrink:0 }}>
                            <div style={{ fontSize:9, color:"#444", textTransform:"uppercase", letterSpacing:0.6 }}>{t("perDay")}</div>
                            <div style={{ fontSize:13, color: budgetGiornaliero >= budgetGiornalieroIniziale ? "#27ae60" : budgetGiornaliero >= 0 ? "#e67e22" : "#e74c3c" }}>
                              {fmt(budgetGiornaliero)}
                            </div>
                          </div>
                        )}

                        {/* Budget rimanente */}
                        <div style={{ textAlign:"right", minWidth:72, flexShrink:0 }}>
                          {!isFuture ? (
                            <>
                              <div style={{ fontSize:9, color:"#444", textTransform:"uppercase", letterSpacing:0.6 }}>{t("remaining")}</div>
                              <div style={{ fontSize:13, fontWeight:500, color: runningBudget >= 0 ? "#aaa" : "#e74c3c" }}>{fmt(runningBudget)}</div>
                            </>
                          ) : (
                            <div style={{ fontSize:12, color:"#252530" }}>···</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ====== OVERVIEW ====== */}
        {(tab === "budget" && subTab === "overview") && (() => {
          const CAT_COLORS = { essential: "#e74c3c", extra: "#e67e22", saving: "#27ae60" };
          const CAT_LABELS = { essential: t("essential"), extra: t("extra"), saving: t("saving") };

          // Compute per-person per-cat totals for each month in history
          const allKeys = [...new Set([...Object.keys(history), ...Object.keys(plan)])].sort();

          const getMonthStats = (k) => {
            const p = plan[k] || {};
            const h = history[k] || {};
            const dVal = parseFloat(h.diego) || 0;
            const cVal = parseFloat(h.carmen) || 0;
            const tot = dVal + cVal;
            const dPct = tot > 0 ? dVal / tot : 0.5;
            const cPct = tot > 0 ? cVal / tot : 0.5;

            const stats = {
              diego: { essential: 0, extra: 0, saving: 0, total: 0 },
              carmen: { essential: 0, extra: 0, saving: 0, total: 0 },
            };

            PLAN_STRUCTURE.forEach(group => {
              // use stored structure cat if available
              const storedGroup = structure.find(g => g.id === group.id);
              const items = storedGroup ? storedGroup.items : group.items;
              items.forEach(item => {
                const defaultItem = group.items.find(i => i.id === item.id);
                const cat = item.cat || (defaultItem && defaultItem.cat) || "extra";
                if (group.splitMode === "auto") {
                  const amt = parseFloat(p[item.id]) || 0;
                  const d = amt * dPct;
                  const c = amt * cPct;
                  stats.diego[cat] = (stats.diego[cat] || 0) + d;
                  stats.carmen[cat] = (stats.carmen[cat] || 0) + c;
                  stats.diego.total += d;
                  stats.carmen.total += c;
                } else {
                  const v = p[item.id] || {};
                  const d = parseFloat(v.diego) || 0;
                  const c = parseFloat(v.carmen) || 0;
                  stats.diego[cat] = (stats.diego[cat] || 0) + d;
                  stats.carmen[cat] = (stats.carmen[cat] || 0) + c;
                  stats.diego.total += d;
                  stats.carmen.total += c;
                }
              });
            });
            return stats;
          };

          // Build chart data for last 6 months
          const chartMonths = allKeys.slice(-6);
          const chartData = chartMonths.map(k => {
            const [y, m] = k.split("-");
            const label = MONTHS[parseInt(m) - 1].slice(0, 3);
            const stats = getMonthStats(k);
            return {
              name: label,
              key: k,
              d_essential: Math.round(stats.diego.essential),
              d_extra: Math.round(stats.diego.extra),
              d_saving: Math.round(stats.diego.saving),
              c_essential: Math.round(stats.carmen.essential),
              c_extra: Math.round(stats.carmen.extra),
              c_saving: Math.round(stats.carmen.saving),
            };
          });

          // Current month stats
          const currentStats = getMonthStats(key);
          const [y2, m2] = key.split("-");
          const monthLabel = `${MONTHS[parseInt(m2)-1]} ${y2}`;

          const CustomTooltip = ({ active, payload, label }) => {
            if (!active || !payload) return null;
            return (
              <div style={{ background:"#1a1a22", border:"1px solid #2a2a35", borderRadius:8, padding:"10px 14px" }}>
                <div style={{ fontSize:12, color:"#e8c547", fontWeight:600, marginBottom:6 }}>{label}</div>
                {payload.map((p, i) => (
                  <div key={i} style={{ fontSize:11, color:p.color, marginBottom:2 }}>
                    {p.name}: {fmt(p.value)}
                  </div>
                ))}
              </div>
            );
          };

          return (
            <div>
              <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:20 }}>{t("overviewTitle")}</div>

              {/* Current month summary cards */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                {[[`diego`,N1,`#4a9eff`],[`carmen`,N2,`#ff6b9d`]].map(([p,label,color]) => (
                  <div key={p} style={{ background:`${color}0d`, border:`1px solid ${color}22`, borderRadius:14, padding:16 }}>
                    <div style={{ fontSize:11, color, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>{label}</div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#f0ede8", marginBottom:12 }}>{fmt(currentStats[p].total)}</div>
                    {["essential","extra","saving"].map(cat => (
                      <div key={cat} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:CAT_COLORS[cat] }} />
                          <span style={{ fontSize:11, color:"#888" }}>{CAT_LABELS[cat]}</span>
                        </div>
                        <span style={{ fontSize:12, color:"#ccc" }}>{fmt(currentStats[p][cat])}</span>
                      </div>
                    ))}
                    {/* Mini bar */}
                    <div style={{ marginTop:10, height:5, borderRadius:3, overflow:"hidden", display:"flex" }}>
                      {["essential","extra","saving"].map(cat => {
                        const w = currentStats[p].total > 0 ? (currentStats[p][cat] / currentStats[p].total) * 100 : 0;
                        return <div key={cat} style={{ width:`${w}%`, background:CAT_COLORS[cat] }} />;
                      })}
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                      {["essential","extra","saving"].map(cat => {
                        const w = currentStats[p].total > 0 ? (currentStats[p][cat] / currentStats[p].total) * 100 : 0;
                        return w > 5 ? <span key={cat} style={{ fontSize:9, color:CAT_COLORS[cat] }}>{w.toFixed(0)}%</span> : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {chartData.length > 0 && (
                <>
                  {/* Diego chart */}
                  <div style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:14, padding:"16px 8px 8px 8px", marginBottom:14 }}>
                    <div style={{ fontSize:11, color:"#4a9eff", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:14, paddingLeft:8 }}>{`📊 ${N1} — ${t("monthlyPlanLabel")}`}</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData} barSize={18}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:11, color:"#888" }} />
                        <Bar dataKey="d_essential" name={t("essential")} stackId="d" fill={CAT_COLORS.essential} radius={[0,0,0,0]} />
                        <Bar dataKey="d_extra" name={t("extra")} stackId="d" fill={CAT_COLORS.extra} radius={[0,0,0,0]} />
                        <Bar dataKey="d_saving" name={t("saving")} stackId="d" fill={CAT_COLORS.saving} radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Carmen chart */}
                  <div style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:14, padding:"16px 8px 8px 8px", marginBottom:14 }}>
                    <div style={{ fontSize:11, color:"#ff6b9d", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:14, paddingLeft:8 }}>{`📊 ${N2} — ${t("monthlyPlanLabel")}`}</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData} barSize={18}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:11, color:"#888" }} />
                        <Bar dataKey="c_essential" name={t("essential")} stackId="c" fill={CAT_COLORS.essential} />
                        <Bar dataKey="c_extra" name={t("extra")} stackId="c" fill={CAT_COLORS.extra} />
                        <Bar dataKey="c_saving" name={t("saving")} stackId="c" fill={CAT_COLORS.saving} radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Combined comparison */}
                  <div style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:14, padding:"16px 8px 8px 8px" }}>
                    <div style={{ fontSize:11, color:"#e8c547", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:14, paddingLeft:8 }}>{`📊 ${t("familyMonthlyLabel")}`}</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData.map(d => ({ ...d, diego_tot: d.d_essential + d.d_extra + d.d_saving, carmen_tot: d.c_essential + d.c_extra + d.c_saving }))} barSize={18}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:11, color:"#888" }} />
                        <Bar dataKey="diego_tot" name={N1} fill="#4a9eff" radius={[3,3,0,0]} />
                        <Bar dataKey="carmen_tot" name={N2} fill="#ff6b9d" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {chartData.length === 0 && (
                <div style={{ textAlign:"center", color:"#333", fontSize:13, padding:"40px 0" }}>
                  Inserisci i dati nel Plan per vedere i grafici
                </div>
              )}
            </div>
          );
        })()}

        {/* ====== BOLLETTE ====== */}
        {(tab === "casa" && subTab === "bollette") && (() => {
          const BCOLS = [
            { id: "luce",     label: "Luce",        color: "#f1c40f", unit: "€" },
            { id: "pannelli", label: "Pannelli",     color: "#2ecc71", unit: "€", isCredit: true },
            { id: "gas",      label: "Gas",          color: "#e67e22", unit: "€" },
            { id: "pellet",   label: "Pellet",       color: "#a04000", unit: "€" },
            { id: "acqua",    label: "Acqua",        color: "#3498db", unit: "€" },
          ];

          const getNetLuce = (row) => {
            const luce = parseFloat(row.luce) || 0;
            const pannelli = parseFloat(row.pannelli) || 0;
            return luce - pannelli;
          };

          const getRowTotal = (row) => {
            const netLuce = getNetLuce(row);
            return netLuce + (parseFloat(row.gas) || 0) + (parseFloat(row.pellet) || 0) + (parseFloat(row.acqua) || 0);
          };

          const bKey = (m, y) => `${y}-${String(m+1).padStart(2,"0")}`;

          const saveBollettaRow = (rowKey, field, value) => {
            const existing = bollette.find(b => b.key === rowKey) || { key: rowKey };
            const updated = { ...existing, [field]: value };
            const newB = bollette.find(b => b.key === rowKey)
              ? bollette.map(b => b.key === rowKey ? updated : b)
              : [...bollette, updated];
            saveBollette(newB);
          };

          const deleteBollettaRow = (rowKey) => saveBollette(bollette.filter(b => b.key !== rowKey));

          // Build list of all months with data + last 24 months
          const allBKeys = new Set(bollette.map(b => b.key));
          const now = new Date();
          for (let i = 0; i < 24; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            allBKeys.add(bKey(d.getMonth(), d.getFullYear()));
          }
          const sortedKeys = [...allBKeys].sort((a, b) => b.localeCompare(a));

          // Yearly summaries
          const yearTotals = {};
          bollette.forEach(b => {
            const y = b.key.split("-")[0];
            if (!yearTotals[y]) yearTotals[y] = { luce: 0, pannelli: 0, lucenet: 0, gas: 0, pellet: 0, acqua: 0 };
            yearTotals[y].luce     += parseFloat(b.luce)     || 0;
            yearTotals[y].pannelli += parseFloat(b.pannelli) || 0;
            yearTotals[y].lucenet  += getNetLuce(b);
            yearTotals[y].gas      += parseFloat(b.gas)      || 0;
            yearTotals[y].pellet   += parseFloat(b.pellet)   || 0;
            yearTotals[y].acqua    += parseFloat(b.acqua)    || 0;
          });
          const years = Object.keys(yearTotals).sort((a, b) => b.localeCompare(a));

          const getRow = (k) => bollette.find(b => b.key === k) || {};

          return (
            <div>
              <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:16 }}>{t("bolletteTitle")}</div>

              {/* Yearly summary */}
              {years.length > 0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:11, color:"#666", marginBottom:10 }}>{t("yearSummary")}</div>
                  {years.map(y => {
                    const yt = yearTotals[y];
                    const rowTotal = BCOLS.reduce((a, c) => a + (yt[c.id] || 0), 0);
                    return (
                      <div key={y} style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:12, padding:"12px 14px", marginBottom:8 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#e8c547" }}>{y}</span>
                          <span style={{ fontSize:15, fontWeight:600, color:"#f0ede8" }}>{fmt(yearTotals[y].lucenet + yearTotals[y].gas + yearTotals[y].pellet + yearTotals[y].acqua)}</span>
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {/* Net luce */}
                          {yearTotals[y].luce > 0 && (
                            <div style={{ background:"rgba(241,196,15,0.1)", border:"1px solid rgba(241,196,15,0.25)", borderRadius:7, padding:"5px 10px" }}>
                              <div style={{ fontSize:9, color:"#f1c40f", fontWeight:700, marginBottom:1 }}>{t("netLuce").toUpperCase()}</div>
                              <div style={{ fontSize:12, color:"#ccc" }}>{fmt(yearTotals[y].lucenet)}</div>
                              {yearTotals[y].pannelli > 0 && (
                                <div style={{ fontSize:9, color:"#2ecc71", marginTop:2 }}>- Pannelli {fmt(yearTotals[y].pannelli)}</div>
                              )}
                            </div>
                          )}
                          {[["gas","#e67e22"],["pellet","#a04000"],["acqua","#3498db"]].filter(([id]) => yearTotals[y][id] > 0).map(([id, color]) => (
                            <div key={id} style={{ background:`${color}15`, border:`1px solid ${color}30`, borderRadius:7, padding:"5px 10px" }}>
                              <div style={{ fontSize:9, color, fontWeight:700, marginBottom:1 }}>{id.toUpperCase()}</div>
                              <div style={{ fontSize:12, color:"#ccc" }}>{fmt(yearTotals[y][id])}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Monthly rows */}
              <div style={{ fontSize:11, color:"#666", marginBottom:10 }}>{t("monthlyDetail")} </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {sortedKeys.map(k => {
                  const [ky, km] = k.split("-");
                  const label = `${MONTHS[parseInt(km)-1]} ${ky}`;
                  const row = getRow(k);
                  const hasData = BCOLS.some(c => parseFloat(row[c.id]) > 0) || row.note;
                  const rowTotal = getRowTotal(row);
                  const netLuce = getNetLuce(row);
                  const isExpanded = activeCell && activeCell.startsWith(k);

                  return (
                    <div key={k} style={{ background: hasData ? "#141418" : "#0f0f12", border:`1px solid ${hasData ? "#1f1f28" : "#161618"}`, borderRadius:12, overflow:"hidden" }}>
                      {/* Row header */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px" }}
                        onClick={() => setActiveCell(isExpanded ? null : `${k}-luce`)}>
                        <span style={{ fontSize:13, color: hasData ? "#ddd" : "#333", fontWeight: hasData ? 500 : 400 }}>{label}</span>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          {rowTotal > 0 && <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:"#e8c547" }}>{fmt(rowTotal)}</span>}
                          <span style={{ fontSize:11, color:"#333" }}>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                      </div>

                      {/* Expanded: show all fields */}
                      {isExpanded && (
                        <div style={{ borderTop:"1px solid #1a1a22", padding:"12px 14px", display:"flex", flexDirection:"column", gap:10 }}>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                            {/* Luce + Pannelli grouped */}
                            <div>
                              <div style={{ fontSize:10, color:"#f1c40f", fontWeight:700, letterSpacing:0.8, marginBottom:4 }}>{t("luceSpesa")}</div>
                              <div style={{ position:"relative" }}>
                                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12 }}>€</span>
                                <input type="number" placeholder="0,00" value={row.luce || ""} onChange={e => saveBollettaRow(k, "luce", e.target.value)} style={{ paddingLeft:24, padding:"8px 10px 8px 24px", fontSize:13, borderColor: parseFloat(row.luce) > 0 ? "rgba(241,196,15,0.4)" : undefined }} />
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize:10, color:"#2ecc71", fontWeight:700, letterSpacing:0.8, marginBottom:4 }}>{t("pannelliCredit")}</div>
                              <div style={{ position:"relative" }}>
                                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12 }}>€</span>
                                <input type="number" placeholder="0,00" value={row.pannelli || ""} onChange={e => saveBollettaRow(k, "pannelli", e.target.value)} style={{ paddingLeft:24, padding:"8px 10px 8px 24px", fontSize:13, borderColor: parseFloat(row.pannelli) > 0 ? "rgba(46,204,113,0.4)" : undefined }} />
                              </div>
                            </div>
                            {/* Net luce result */}
                            {(parseFloat(row.luce) > 0 || parseFloat(row.pannelli) > 0) && (
                              <div style={{ gridColumn:"1/-1", background:"rgba(241,196,15,0.07)", border:"1px solid rgba(241,196,15,0.2)", borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                                <span style={{ fontSize:11, color:"#888" }}>{t("netLuce")} ({fmt(row.luce||0)} − {fmt(row.pannelli||0)})</span>
                                <span style={{ fontSize:15, fontWeight:600, color: netLuce <= 0 ? "#2ecc71" : "#f1c40f" }}>{fmt(netLuce)}</span>
                              </div>
                            )}
                            {[{id:"gas",color:"#e67e22",label:"Gas"},{id:"pellet",color:"#a04000",label:"Pellet"},{id:"acqua",color:"#3498db",label:"Acqua"}].map(c => (
                              <div key={c.id}>
                                <div style={{ fontSize:10, color:c.color, fontWeight:700, letterSpacing:0.8, marginBottom:4 }}>{c.label.toUpperCase()}</div>
                                <div style={{ position:"relative" }}>
                                  <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12 }}>€</span>
                                  <input type="number" placeholder="0,00" value={row[c.id] || ""} onChange={e => saveBollettaRow(k, c.id, e.target.value)} style={{ paddingLeft:24, padding:"8px 10px 8px 24px", fontSize:13, borderColor: parseFloat(row[c.id]) > 0 ? `${c.color}44` : undefined }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Note */}
                          <div>
                            <div style={{ fontSize:10, color:"#666", fontWeight:700, letterSpacing:0.8, marginBottom:4 }}>{t("note")}</div>
                            <input
                              type="text"
                              placeholder="Note..."
                              value={row.note || ""}
                              onChange={e => saveBollettaRow(k, "note", e.target.value)}
                              style={{ fontSize:13 }}
                            />
                          </div>
                          {/* Mini summary + delete */}
                          {hasData && (
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:2 }}>
                              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                                {BCOLS.filter(c => parseFloat(row[c.id]) > 0).map(c => (
                                  <span key={c.id} style={{ fontSize:10, color:c.color }}>● {c.label}: {fmt(row[c.id])}</span>
                                ))}
                              </div>
                              <button onClick={() => { deleteBollettaRow(k); setActiveCell(null); }} style={{ fontSize:11, color:"#c0392b", padding:"4px 8px", border:"1px solid rgba(192,57,43,0.3)", borderRadius:6 }}>
                                Elimina
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {!isExpanded && hasData && (
                        <div style={{ display:"flex", flexWrap:"wrap", gap:5, padding:"0 14px 10px" }}>
                          {/* Net luce pill */}
                          {(parseFloat(row.luce) > 0) && (
                            <span style={{ fontSize:10, color:"#f1c40f", background:"rgba(241,196,15,0.1)", borderRadius:5, padding:"2px 7px" }}>
                              Luce {fmt(netLuce)}
                              {parseFloat(row.pannelli) > 0 && <span style={{ color:"#2ecc71" }}> (-{fmt(row.pannelli)})</span>}
                            </span>
                          )}
                          {["gas","pellet","acqua"].filter(id => parseFloat(row[id]) > 0).map(id => {
                            const col = BCOLS.find(c => c.id === id);
                            return <span key={id} style={{ fontSize:10, color:col.color, background:`${col.color}12`, borderRadius:5, padding:"2px 7px" }}>{col.label} {fmt(row[id])}</span>;
                          })}
                          {row.note && <span style={{ fontSize:10, color:"#666", fontStyle:"italic" }}>"{row.note}"</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ====== BOLLETTE GRAFICI ====== */}
        {(tab === "casa" && subTab === "grafici") && (() => {
          // Build monthly series sorted asc
          const sorted = [...bollette].sort((a,b) => a.key.localeCompare(b.key));

          const monthlyData = sorted.map(b => {
            const [y, m] = b.key.split("-");
            return {
              name: `${MONTHS[parseInt(m)-1].slice(0,3)} ${y.slice(2)}`,
              luce: Math.round(((parseFloat(b.luce)||0) - (parseFloat(b.pannelli)||0)) * 100) / 100,
              pannelli: parseFloat(b.pannelli) || 0,
              gas: parseFloat(b.gas) || 0,
              pellet: parseFloat(b.pellet) || 0,
              acqua: parseFloat(b.acqua) || 0,
            };
          });

          // Yearly totals
          const yearMap = {};
          bollette.forEach(b => {
            const y = b.key.split("-")[0];
            if (!yearMap[y]) yearMap[y] = { luce:0, pannelli:0, gas:0, pellet:0, acqua:0 };
            yearMap[y].luce     += parseFloat(b.luce)||0;
            yearMap[y].pannelli += parseFloat(b.pannelli)||0;
            yearMap[y].gas      += parseFloat(b.gas)||0;
            yearMap[y].pellet   += parseFloat(b.pellet)||0;
            yearMap[y].acqua    += parseFloat(b.acqua)||0;
          });
          const yearlyData = Object.entries(yearMap).sort((a,b) => b[0].localeCompare(a[0])).map(([y, v]) => ({
            name: y,
            luceNetta: Math.round((v.luce - v.pannelli)*100)/100,
            gas: Math.round(v.gas*100)/100,
            pellet: Math.round(v.pellet*100)/100,
            acqua: Math.round(v.acqua*100)/100,
          }));

          const CustomTooltip = ({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div style={{ background:"#1a1a22", border:"1px solid #2a2a35", borderRadius:8, padding:"10px 14px", fontSize:11 }}>
                <div style={{ color:"#e8c547", fontWeight:600, marginBottom:4 }}>{label}</div>
                {payload.map((p,i) => <div key={i} style={{ color:p.color }}>{p.name}: {fmt(p.value)}</div>)}
              </div>
            );
          };

          if (monthlyData.length === 0) return (
            <div style={{ textAlign:"center", color:"#333", fontSize:13, padding:"40px 0" }}>
              Inserisci dati nelle Bollette per vedere i grafici
            </div>
          );

          const chartStyle = { background:"#141418", border:"1px solid #1f1f28", borderRadius:14, padding:"14px 8px 8px", marginBottom:14 };
          const titleStyle = { fontSize:11, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", marginBottom:12, paddingLeft:8 };

          return (
            <div>
              <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:16 }}>{t("graficiTitle")}</div>

              {/* ---- MONTHLY CHARTS ---- */}
              <div style={{ fontSize:11, color:"#e8c547", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12, textAlign:"center", padding:"8px", background:"rgba(232,197,71,0.07)", borderRadius:8 }}>{t("monthlyTrend")}</div>

              {/* Luce netta mensile */}
              <div style={chartStyle}>
                <div style={{ ...titleStyle, color:"#f1c40f" }}>{`⚡ ${t("luceNetta")}`}</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} barSize={14}>
                    <XAxis dataKey="name" tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="luce" name="Luce netta" fill="#f1c40f" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gas + Pellet mensile */}
              <div style={chartStyle}>
                <div style={{ ...titleStyle, color:"#e67e22" }}>{`🔥 ${t("gasePellet")}`}</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} barSize={10}>
                    <XAxis dataKey="name" tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize:10 }} />
                    <Bar dataKey="gas" name="Gas" fill="#e67e22" radius={[3,3,0,0]} />
                    <Bar dataKey="pellet" name="Pellet" fill="#a04000" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Acqua mensile */}
              <div style={chartStyle}>
                <div style={{ ...titleStyle, color:"#3498db" }}>💧 Acqua</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} barSize={14}>
                    <XAxis dataKey="name" tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="acqua" name="Acqua" fill="#3498db" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ---- YEARLY CHARTS ---- */}
              {yearlyData.length > 0 && (
                <>
                  <div style={{ fontSize:11, color:"#e8c547", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12, textAlign:"center", padding:"8px", background:"rgba(232,197,71,0.07)", borderRadius:8 }}>{t("yearlyTotals")}</div>

                  {/* Luce annuale */}
                  <div style={chartStyle}>
                    <div style={{ ...titleStyle, color:"#f1c40f" }}>{`⚡ ${t("luceAnno")}`}</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={yearlyData} barSize={30}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={45} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="luceNetta" name="Luce netta" fill="#f1c40f" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Gas+Pellet annuale */}
                  <div style={chartStyle}>
                    <div style={{ ...titleStyle, color:"#e67e22" }}>{`🔥 ${t("gasePelletAnno")}`}</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={yearlyData} barSize={20}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={45} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:10 }} />
                        <Bar dataKey="gas" name="Gas" fill="#e67e22" radius={[4,4,0,0]} />
                        <Bar dataKey="pellet" name="Pellet" fill="#a04000" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Acqua annuale */}
                  <div style={chartStyle}>
                    <div style={{ ...titleStyle, color:"#3498db" }}>{`💧 ${t("acquaAnno")}`}</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={yearlyData} barSize={30}>
                        <XAxis dataKey="name" tick={{ fill:"#666", fontSize:11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill:"#555", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${v}`} width={45} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="acqua" name="Acqua" fill="#3498db" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* ====== PELLET ====== */}
        {(tab === "casa" && subTab === "pellet") && (() => {
          // Sort log by date asc
          const sorted = [...pelletLog].sort((a,b) => a.date.localeCompare(b.date));

          // Build running totals
          let rimasti = 0;
          let rows = sorted.map((entry, i) => {
            rimasti += (parseInt(entry.comprati) || 0) - (parseInt(entry.consumati) || 0);
            // Media: total consumed / days elapsed from first entry
            const totalConsumed = sorted.slice(0, i+1).reduce((a, e) => a + (parseInt(e.consumati)||0), 0);
            const daysElapsed = i + 1;
            const media = daysElapsed > 0 ? totalConsumed / daysElapsed : 0;
            const giorniRimasti = media > 0 ? Math.floor(rimasti / media) : null;
            const fineDate = giorniRimasti !== null ? (() => {
              const d = new Date(entry.date);
              d.setDate(d.getDate() + giorniRimasti);
              return d;
            })() : null;
            return { ...entry, rimasti, media: media.toFixed(2), giorniRimasti, fineDate };
          });

          // Latest row for summary
          const latest = rows[rows.length - 1];

          const addOrUpdatePellet = () => {
            if (!pelletForm.date) return;
            if (editingPellet !== null) {
              const newLog = pelletLog.map(e => e.id === editingPellet ? { ...e, ...pelletForm, comprati: parseInt(pelletForm.comprati)||0, consumati: parseInt(pelletForm.consumati)||0 } : e);
              savePelletLog(newLog);
              setEditingPellet(null);
            } else {
              const entry = { id: Date.now(), date: pelletForm.date, comprati: parseInt(pelletForm.comprati)||0, consumati: parseInt(pelletForm.consumati)||0 };
              savePelletLog([...pelletLog, entry]);
            }
            setPelletForm({ date: today(), comprati: "", consumati: "" });
          };

          const startEditPellet = (entry) => {
            setEditingPellet(entry.id);
            setPelletForm({ date: entry.date, comprati: String(entry.comprati), consumati: String(entry.consumati) });
          };

          const deletePellet = (id) => savePelletLog(pelletLog.filter(e => e.id !== id));

          const formatDate = (d) => {
            const dt = new Date(d);
            return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
          };

          return (
            <div>
              <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:16 }}>Tracker Pellet 🪵</div>

              {/* Summary cards */}
              {latest && (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  <div style={{ background:"rgba(160,64,0,0.12)", border:"1px solid rgba(160,64,0,0.3)", borderRadius:12, padding:"14px 16px", gridColumn:"1/-1" }}>
                    <div style={{ fontSize:10, color:"#a04000", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{t("currentStatus")}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:32, color:"#f0ede8" }}>{latest.rimasti}</div>
                        <div style={{ fontSize:11, color:"#888" }}>{t("bagsLeft")}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color: latest.giorniRimasti > 30 ? "#27ae60" : latest.giorniRimasti > 14 ? "#e67e22" : "#e74c3c" }}>
                          {latest.giorniRimasti ?? "—"} {t("daysRemain")}
                        </div>
                        {latest.fineDate && (
                          <div style={{ fontSize:12, color:"#888" }}>{t("finishOn")} {formatDate(latest.fineDate)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{t("avgPerDay")}</div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#e8c547" }}>{latest.media}</div>
                    <div style={{ fontSize:11, color:"#555" }}>{t("bags")}</div>
                  </div>
                  <div style={{ background:"#141418", border:"1px solid #1f1f28", borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{t("totalBought")}</div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:"#a0d4ff" }}>{sorted.reduce((a,e) => a+(parseInt(e.comprati)||0), 0)}</div>
                    <div style={{ fontSize:11, color:"#555" }}>{t("bags")}</div>
                  </div>
                </div>
              )}

              {/* Add/Edit form */}
              <div style={{ background:"#141418", border:"1px solid #252530", borderRadius:14, padding:16, marginBottom:16 }}>
                <div style={{ fontSize:11, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>
                  {editingPellet ? t("editRow") : t("addRow")}
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  <div style={{ flex:2 }}>
                    <div style={{ fontSize:10, color:"#666", marginBottom:4 }}>{t("date")}</div>
                  <input type="date" value={pelletForm.date} onChange={e => setPelletForm(f => ({...f, date: e.target.value}))} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:"#a0d4ff", marginBottom:4 }}>{t("bought")}</div>
                    <input type="number" placeholder="0" value={pelletForm.comprati} onChange={e => setPelletForm(f => ({...f, comprati: e.target.value}))} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:"#a04000", marginBottom:4 }}>{t("consumed")}</div>
                    <input type="number" placeholder="0" value={pelletForm.consumati} onChange={e => setPelletForm(f => ({...f, consumati: e.target.value}))} />
                  </div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={addOrUpdatePellet} style={{ flex:1, background:"#e8c547", color:"#0d0d0f", borderRadius:10, padding:"11px", fontSize:13, fontWeight:700 }}>
                    {editingPellet ? t("saveChanges") : t("add")}
                  </button>
                  {editingPellet && (
                    <button onClick={() => { setEditingPellet(null); setPelletForm({ date: today(), comprati:"", consumati:"" }); }} style={{ background:"#1f1f28", color:"#888", borderRadius:10, padding:"11px 16px", fontSize:13 }}>
                      Annulla
                    </button>
                  )}
                </div>
              </div>

              {/* Table header */}
              {rows.length > 0 && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"80px 50px 60px 55px 55px 60px 80px 40px", gap:4, padding:"6px 10px", marginBottom:4 }}>
                    {[t("date"),"🛒","🔥","Rimasti","Media/g","Giorni","Finisce",""].map((h,i) => (
                      <div key={i} style={{ fontSize:9, color:"#555", fontWeight:700, letterSpacing:0.6, textTransform:"uppercase", textAlign: i > 2 ? "right" : "left" }}>{h}</div>
                    ))}
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                    {[...rows].reverse().map((row, i) => {
                      const isToday = row.date === today();
                      const isEditing = editingPellet === row.id;
                      return (
                        <div key={row.id} style={{ display:"grid", gridTemplateColumns:"80px 50px 60px 55px 55px 60px 80px 40px", gap:4, padding:"8px 10px", background: isToday ? "rgba(232,197,71,0.08)" : isEditing ? "rgba(142,68,173,0.1)" : i % 2 === 0 ? "#141418" : "#111115", borderRadius:8, border: isToday ? "1px solid rgba(232,197,71,0.3)" : "1px solid transparent", alignItems:"center" }}>
                          <div style={{ fontSize:12, color: isToday ? "#e8c547" : "#ccc" }}>{formatDate(row.date)}</div>
                          <div style={{ fontSize:12, color: row.comprati > 0 ? "#a0d4ff" : "#333", textAlign:"right", fontWeight: row.comprati > 0 ? 600 : 400 }}>{row.comprati || "—"}</div>
                          <div style={{ fontSize:12, color: row.consumati > 0 ? "#e67e22" : "#333", textAlign:"right" }}>{row.consumati || "—"}</div>
                          <div style={{ fontSize:12, color:"#f0ede8", textAlign:"right", fontWeight:600 }}>{row.rimasti}</div>
                          <div style={{ fontSize:11, color:"#888", textAlign:"right" }}>{row.media}</div>
                          <div style={{ fontSize:12, color: row.giorniRimasti > 30 ? "#27ae60" : row.giorniRimasti > 14 ? "#e67e22" : "#e74c3c", textAlign:"right", fontWeight:600 }}>
                            {row.giorniRimasti ?? "—"}
                          </div>
                          <div style={{ fontSize:10, color:"#666", textAlign:"right" }}>
                            {row.fineDate ? formatDate(row.fineDate) : "—"}
                          </div>
                          <div style={{ display:"flex", gap:3, justifyContent:"flex-end" }}>
                            <button onClick={() => startEditPellet(row)} style={{ fontSize:11, color:"#555", padding:"2px" }}>✏️</button>
                            <button onClick={() => deletePellet(row.id)} style={{ fontSize:13, color:"#2a2a35", padding:"2px" }}>×</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {rows.length === 0 && (
                <div style={{ textAlign:"center", color:"#333", fontSize:13, padding:"40px 0" }}>
                  Aggiungi la prima riga per iniziare il tracking
                </div>
              )}
            </div>
          );
        })()}

        {/* ====== STORICO ====== */}
        {(tab === "spese" && subTab === "storico") && (
          <div>
            <div style={{ fontSize:10, color:"#555", letterSpacing:1.5, textTransform:"uppercase", marginBottom:18 }}>{t("storicoTitle")}</div>
            {historyEntries.length === 0 ? (
              <div style={{ textAlign:"center", color:"#333", fontSize:13, padding:"40px 0" }}>{t("noData")}</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {historyEntries.map(e => (
                  <div key={e.key} style={{ background:"#141418", borderRadius:12, padding:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
                      <span style={{ fontSize:15, fontWeight:500 }}>{e.month} {e.year}</span>
                      <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#e8c547" }}>{fmt(e.total)}</span>
                    </div>
                    <div style={{ height:5, borderRadius:3, overflow:"hidden", display:"flex", marginBottom:8 }}>
                      <div style={{ width:`${e.dPct}%`, background:"#4a9eff" }} />
                      <div style={{ width:`${e.cPct}%`, background:"#ff6b9d" }} />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:12, color:"#4a9eff" }}>{N1} {fmt(e.diego)} ({e.dPct.toFixed(1)}%)</span>
                      <span style={{ fontSize:12, color:"#ff6b9d" }}>{N2} {fmt(e.carmen)} ({e.cPct.toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
