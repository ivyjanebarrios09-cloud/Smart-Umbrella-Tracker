export function LandingFooter() {
    return (
        <footer className="bg-background border-t">
            <div className="container flex items-center justify-center h-16">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} GaleLight. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}
