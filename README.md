# JALEX Music Website – Local Setup Guide (macOS & Windows)

This guide explains how to run the JALEX Music Jekyll site locally for both **macOS** and **Windows** users.

---

## 1️⃣ Prerequisites

You need:
- **Git** installed  
  - [Download for macOS & Windows](https://git-scm.com/downloads)
- **Ruby** and **Bundler** installed
  - macOS: Ruby is preinstalled, but use Homebrew for an updated version
  - Windows: Install Ruby via [RubyInstaller for Windows](https://rubyinstaller.org/downloads/) (with DevKit)

---

## 2️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

---

## 3️⃣ Install Gems Locally (no admin/sudo needed)

We keep all Ruby gems inside the project so you don’t need system permissions.

```bash
bundle config set --local path 'vendor/bundle'
```

If you don’t have a `Gemfile` yet, create one:

```bash
cat > Gemfile <<'RUBY'
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
RUBY
```

Now install:

```bash
bundle install
```

---

## 4️⃣ Run the Local Server

```bash
bundle exec jekyll serve --livereload
```

The site will be available at:
```
http://localhost:4000
```

---

## 5️⃣ macOS Notes

If you get **permission errors** when installing gems:

1. Install Homebrew if you don’t have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install Ruby via Homebrew:
   ```bash
   brew install ruby
   ```
3. Add to your shell config (`~/.zshrc` for default shell):
   ```bash
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```
4. Retry the install:
   ```bash
   bundle config set --local path 'vendor/bundle'
   bundle install
   ```

---

## 6️⃣ Windows Notes

If you get errors about `make` or native extensions when installing gems:

1. Install RubyInstaller for Windows (with DevKit) from [rubyinstaller.org](https://rubyinstaller.org/downloads/).
2. When prompted after installation, run the **MSYS2** setup to get build tools.
3. Open a new **Command Prompt** or **PowerShell** and run:
   ```bash
   bundle config set --local path 'vendor/bundle'
   bundle install
   ```

---

## 7️⃣ Stopping the Server

Press `CTRL + C` in the terminal to stop Jekyll.

---

## ✅ Summary Commands (macOS & Windows)

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll serve --livereload
```

Then open **http://localhost:4000** in your browser.