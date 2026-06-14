<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.php");
    exit;
}

function clean_input(string $value): string {
    return trim(strip_tags($value));
}

$vorname     = clean_input($_POST["vorname"] ?? "");
$nachname    = clean_input($_POST["nachname"] ?? "");
$email       = trim($_POST["email"] ?? "");
$unternehmen = clean_input($_POST["unternehmen"] ?? "");
$interesse   = clean_input($_POST["interesse"] ?? "");
$nachricht   = trim($_POST["nachricht"] ?? "");

// Validierung
if (
    $vorname === "" ||
    $nachname === "" ||
    $email === "" ||
    $interesse === "" ||
    $nachricht === ""
) {
    header("Location: contact.php?status=error");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: contact.php?status=invalid-email");
    exit;
}

// Empfänger
$to = "hello@sparkside.agency";

// Betreff
$subject = "Neue Kontaktanfrage von {$vorname} {$nachname}";

// Nachricht
$message  = "Neue Kontaktanfrage über das Formular\n";
$message .= "-----------------------------------\n\n";
$message .= "Vorname: {$vorname}\n";
$message .= "Nachname: {$nachname}\n";
$message .= "E-Mail: {$email}\n";
$message .= "Unternehmen: " . ($unternehmen !== "" ? $unternehmen : "-") . "\n";
$message .= "Interesse: {$interesse}\n\n";
$message .= "Nachricht:\n{$nachricht}\n";

// Header
$headers   = [];
$headers[] = "From: Sparkside Website <no-reply@sparkside.agency>";
$headers[] = "Reply-To: {$email}";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$success = mail($to, $subject, $message, implode("\r\n", $headers));

if ($success) {
    header("Location: contact.php?status=success");
    exit;
} else {
    header("Location: contact.php?status=send-error");
    exit;
}
?>