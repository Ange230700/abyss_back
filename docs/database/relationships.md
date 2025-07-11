<!-- docs\database\relationships.md -->

### **Entities & Relationships**

#### 1. `user`

* **Can have many `favorite`** entries (One user can favorite many furniture items)
* **Role**: `admin`, `visitor`, `customer`, or `seller`

#### 2. `favorite`

* **Belongs to one `user`** (via `id_user`)
* **Belongs to one `furniture`** (via `id_furniture`)
* **Many-to-many bridge between `user` and `furniture`** (with `is_favorite` as a flag)

#### 3. `furniture`

* **Belongs to one `furniture_type`** (via `id_type`)
* **Has many `favorite`** entries (can be favorited by multiple users)
* **Has many `furniture_material`** (each item can be made of multiple materials)
* **Has many `image`** (can have multiple images)

#### 4. `furniture_type`

* **Has many `furniture`** (one type, e.g., "Table", "Chair", can be assigned to many items)

#### 5. `material`

* **Has many `furniture_material`** (one material can be used in multiple furniture items)

#### 6. `furniture_material`

* **Belongs to one `furniture`** (via `id_furniture`)
* **Belongs to one `material`** (via `id_material`)
* **Many-to-many bridge between `furniture` and `material`**

#### 7. `image`

* **Belongs to one `furniture`** (each image is linked to a furniture item)
* **A `furniture` can have multiple images**

---

### **Cardinality Diagram (Textual Format)**

* **user** 1 ── *< favorite >* ── \* N **furniture**
* **furniture** 1 ── N **image**
* **furniture** N ── 1 **furniture_type**
* **furniture** 1 ── *< furniture\_material >* ── \* N **material**

---

### **Relationship Table**

| From Entity         | Relationship Type | To Entity           | Details/Bridge Table                          |
| ------------------- | ----------------- | ------------------- | --------------------------------------------- |
| user                | 1 to N            | favorite            | user can favorite many furniture              |
| furniture           | 1 to N            | favorite            | furniture can be favorited by many users      |
| favorite            | N to 1            | user                | foreign key: id\_user                         |
| favorite            | N to 1            | furniture           | foreign key: id\_furniture                    |
| furniture           | N to 1            | furniture\_type       | foreign key: id\_type                         |
| furniture           | 1 to N            | image               | one furniture has many images                 |
| furniture           | 1 to N            | furniture\_material | one furniture made of multiple materials      |
| material            | 1 to N            | furniture\_material | one material used in multiple furniture items |
| furniture\_material | N to 1            | furniture           | foreign key: id\_furniture                    |
| furniture\_material | N to 1            | material            | foreign key: id\_material                     |

---

### **ERD (Text Style)**

```text
user (1) ────< (N) favorite (N) >──── (1) furniture
furniture (N) ─── (1) furniture_type
furniture (1) ─── (N) image
furniture (1) ───< (N) furniture_material (N) >─── (1) material
```

---

**Summary**:

* `user` and `furniture` are linked by a many-to-many via `favorite`.
* `furniture` and `material` are linked by a many-to-many via `furniture_material`.
* Each `furniture` has one type, and can have many images.
